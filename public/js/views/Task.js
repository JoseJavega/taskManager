import { Modal } from "../controllers/Modal.js";
import { ModalConfirmation } from "../controllers/Modal.js";
import { formatDate } from "../utils/formatDate.js";

export class TasksView{

  static resetTasksList(){
    const taskContainer=document.getElementById('tasks-list');
    if (!taskContainer) return;
    taskContainer.innerHTML='';
  };

  static dateString(dateValues){
    if (!dateValues){ return };
    const date= `${dateValues.day}-${dateValues.month}-${dateValues.year} a las ${dateValues.hour}:${dateValues.minutes} horas`;
    return date;
  };

  static updateCard(data){
    const taskList=document.getElementById('tasks-list');
    const taskCompletedList=document.getElementById('tasks-completed-list');
    const taskCard = document.querySelector(`[data-id="${data._id}"]`);
    if (!taskCard) { return }

    taskCard.querySelector('#task_title').textContent = data.title +": ";
    taskCard.querySelector('#task_description').textContent = data.description ?? '';
    if (data.updatedAt){
      taskCard.querySelector('#task_updated').textContent = 'última actualización: ' + this.dateString(formatDate(data.updatedAt) );
    }

    const oldStateCompleted = taskCard.classList.contains('completed') === true;
    const dataCompleted = !!data.completed;
    if ( oldStateCompleted === dataCompleted ) { return }

    if (dataCompleted){
      taskCard.classList.add('completed');
      taskCard.querySelector('#task_finished').textContent = 'finalizado: ' + this.dateString(formatDate(data.finishedAt) );
      taskCompletedList.prepend(taskCard);
    }else {
      taskCard.classList.remove('completed');
      taskCard.querySelector('#task_finished').textContent = '';
      taskList.prepend(taskCard);
    }

  }

  static deleteCard(id){
    const taskList = document.getElementById('tasks-list');
    const taskCard = taskList.querySelector(`[data-id="${id}"]`);

    if (taskCard) taskCard.remove();
  }

  static renderCard(input){
    const taskList=document.getElementById('tasks-list');
    const taskCompletedList=document.getElementById('tasks-completed-list');
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

  static openModal(data){
    let action = 'create';
    let h2= 'NUEVA TAREA';
    let inputId='', titleData='', descriptionData='', finishedData = '';

    if (data){
      action = 'update';
      h2 = 'ACTUALIZAR TAREA';
      titleData = data.title;
      descriptionData = data.description;
      // input hidden para pasar el id de task
      inputId=`<input type="text" id="task-id" name="id" value ="${data._id}" hidden>`;
      if (data.completed){ finishedData = 'checked' };
    }

    const modalFormBody=`
      <form class="form-task">
        <H2>${h2}</H2>
        ${inputId}
        <div class"form-group, form-group--column">
          <label for="task-name">Título:</label>
          <input type="text" id="task-name" name="title" value ="${titleData}" placeholder="Tu próxima tarea" maxlength="25" required>
        </div>
        <div class"form-group, form-group--column">
          <label for="task-description">Descripción:</label>
          <textarea type="text" id="task-description" name="description" placeholder="Qué tienes que hacer" maxlength="40" required>${descriptionData}</textarea>
        </div>
        <div class"form-group, form-group--row">
          <input class="inline" type="checkbox" id="task-finish" name="finished" ${finishedData}>
          <label class="inline" for="task-finish">Finished</label>
        </div>
      </form>
    `
    Modal.open('task', action, modalFormBody);
  }

  static openModalConfirmation(data){
    if (!data){ return };

    const modalFormBody = `
      <H2>ELIMINAR TAREA</H2>
      <p>Se va a eliminar la tarea</p>
      <p id='task-data' data-id="${data._id}">${data.title}</p> `;

    ModalConfirmation.open('task', 'delete', modalFormBody);
  }
}

