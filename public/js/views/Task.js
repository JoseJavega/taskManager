import { Modal } from "../controllers/Modal.js";
import { formatDate } from "../helpers/format_date.js";

export class TasksView{
  static dateString(dateValues){
    if (!dateValues){ return };
    const date= `${dateValues.day}-${dateValues.month}-${dateValues.year} a las ${dateValues.hour}:${dateValues.minutes} horas`;
    return date;
  }

  static renderCard(input){
    const taskContainer=document.getElementById('tasks-list');
    const taskCard = document.createElement('li');
    const createdAt = this.dateString(formatDate(input.createdAt) );
    const updatedAtValues = formatDate(input.updatedAt);
    const finishedAtValues = formatDate(input.updatedAt);

    taskCard.classList.add('task-card');
    taskCard.dataset.id = input._id;

    taskCard.innerHTML=`
      <div class="task-info-main">
        <button class="btn_crud btn_crud--finish" data-action="finish"><img src="./assets/icons/check.svg"></button>
        <p>
          <span class="bold">${input.title}: </span>${input.description}
        </p>
        <div class="btn_crud--container">
          <button class="btn_crud btn_crud--edit" data-action="edit"><img src="./assets/icons/edit.svg"></button>
          <button class="btn_crud btn_crud--delete" data-action="delete"><img src="./assets/icons/delete.svg"></button>
        </div>
      </div>

      <div>
        <p class="substring">creado: ${createdAt}</p>
      </div>
      `;
    taskContainer.appendChild(taskCard);
  };

  static openModal(){
    const modalFormBody=`
      <form class="form-task">
        <H2>NUEVA TAREA</H2>
        <div class"form-group, form-group--column">
          <label for="task-name">Título:</label>
          <input type="text" id="task-name" name="title" placeholder="Tu próxima tarea" maxlength="25" required>
        </div>
        <div class"form-group, form-group--column">
          <label for="task-description">Descripción:</label>
          <textarea type="text" id="task-description" name="description" placeholder="Qué tienes que hacer" maxlength="40" required></textarea>
        </div>
        <div class"form-group, form-group--row">
          <input class="inline" type="checkbox" id="task-finish" name="finished">
          <label class="inline" for="task-finish">Finished</label>
        </div>
      </form>
    `
    Modal.open('task',modalFormBody);
  }

}

