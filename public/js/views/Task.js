import { Modal } from "../controllers/Modal.js";
import { ModalConfirmation } from "../controllers/Modal.js";
import { formatDate } from "../utils/formatDate.js";
import { dinamicSelect } from "../utils/dinamicSelect.js";

export class TasksView{

  static async resetTasksList(){
    const taskContainer=document.getElementById('task-categories-container');
    if (!taskContainer) return;
    taskContainer.innerHTML='';
  };

  static dateString(dateValues){
    if (!dateValues){ return };
    const date= `${dateValues.day}-${dateValues.month}-${dateValues.year} a las ${dateValues.hour}:${dateValues.minutes} horas`;
    return date;
  };

 static deleteCard(id){
    const taskCard = document.querySelector(`[data-id="${id}"]`);
    if (taskCard){ taskCard.remove() };
    }

  static renderCard(input){
    //DIV de la categoria
    const categoryContainer = input.categoryId ?
      document.querySelector(`[id="${input.categoryId}"]`) :
      document.querySelector('#uncategorized');
    //listas de tareas
    const taskList = categoryContainer.querySelector('.tasks-list');
    const taskCompletedList = categoryContainer.querySelector('.tasks-list-completed');

    const taskCard = document.createElement('li');
    const createdAt = this.dateString(formatDate(input.createdAt) );
    const updatedAtValues = this.dateString(formatDate(input.updatedAt) );
    const finishedAtValues = this.dateString(formatDate(input.finishedAt) );

    const updatedTxt = updatedAtValues ? `última actualización: ${updatedAtValues}` : '';
    const finishedTxt = finishedAtValues ? `finalizado: ${finishedAtValues}` : '';

    const taskCompleted = !!input.completed;

    taskCard.classList.add('task-card');
    taskCard.dataset.id = input._id;

    taskCard.innerHTML=`
      <div class="task-info-main">
        <button class="btn_crud btn_crud--finish" id="task_finished-btn" data-action="finish"><img src="./assets/icons/check.svg"></button>
        <p class="task-text">
          <span id="task_title" class="bold">${input.title}: </span><spam id="task_description">${input.description}</spam>
        </p>
        <div class="btn_crud--container">
          <button class="btn_crud btn_crud--edit" data-action="edit"><img src="./assets/icons/edit.svg"></button>
          <button class="btn_crud btn_crud--delete" data-action="delete"><img src="./assets/icons/delete.svg"></button>
        </div>
      </div>

      <div>
        <p class="substring">
          <spam>creado: ${createdAt}</spam>
          <spam id='task_updated'>${updatedTxt}</spam>
          <spam id='task_finished'>${finishedTxt}</spam>
      </div>
      `;

    if (taskCompleted){
      taskCard.classList.add('completed');
      taskCompletedList.appendChild(taskCard);
    }else{
      taskList.appendChild(taskCard);
    }
  };

  static openModal(dataCategory,dataTask){
    let action = 'create';
    let h2= 'NUEVA TAREA';
    let inputId='', inputTitle='', inputDescription='', inputFinished = '', inputCategory='';

    if (dataTask){
      action = 'update';
      h2 = 'ACTUALIZAR TAREA';
      inputTitle = dataTask.title;
      inputDescription = dataTask.description;
      // input hidden para pasar el id de task
      inputId=`<input type="text" id="task-id" name="id" value ="${dataTask._id}" hidden>`;
      if (dataTask.completed){ inputFinished = 'checked' };
      inputCategory = dataTask.categoryId;
    }

    const modalFormBody=`
      <form class="form-task">
        <H2>${h2}</H2>
        ${inputId}
        <div class="form-group form-group--column">
          <label for="task-name">Título:</label>
          <input type="text" id="task-name" name="title" value ="${inputTitle}" placeholder="Tu próxima tarea" maxlength="25" required>
        </div>
        <div class="form-group form-group--column">
          <label for="task-description">Descripción:</label>
          <textarea type="text" id="task-description" name="description" placeholder="Qué tienes que hacer" maxlength="40" required>${inputDescription}</textarea>
        </div>
        <div class="form-group form-group--row">
          <div class="inline">
            <label class="inline" for="task-finish">Finished</label>
            <input class="inline" type="checkbox" id="task-finish" name="finished" ${inputFinished}>
          </div>
          <div class="inline">
            <label class="inline" for="task-category">Categoría</label>
            <select name="categoryId" id="task-category">${dinamicSelect(dataCategory)}</select>
          </div>
        </div>
      </form>
    `
    Modal.open('task', action, modalFormBody);
  }

  static openModalConfirmation(dataTask){
    if (!dataTask){ return };

    const modalFormBody = `
      <H2>ELIMINAR TAREA</H2>
      <p>Se va a eliminar la tarea</p>
      <p id='task-data' data-id="${dataTask._id}">${dataTask.title}</p> `;

    ModalConfirmation.open('task', 'delete', modalFormBody);
  }

  // CATEGORIES
  static renderCategory (input) {
    const mainContainer = document.getElementById('task-categories-container');
    const categoryContainer = document.createElement('div');

    categoryContainer.classList.add('category-container');
    categoryContainer.id = input._id

    categoryContainer.innerHTML=`
      <H2>${input.name}</H2>
      <ul class='tasks-list'></ul>
      <ul class='tasks-list-completed'></ul>
    `;

    mainContainer.appendChild(categoryContainer);
  }
}

