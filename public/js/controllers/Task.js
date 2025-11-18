import { TasksView } from "../views/Task.js";
import { TaskService } from "../services/Task.js";
import { sortCollection } from "../utils/sortCollection.js";

export class TaskController{
  constructor(apiUrl, containerId){
    this.taskService = new TaskService (apiUrl);
    this.container = document.getElementById(containerId);
    this.sortBy = 'title';
    this.sortDirection= 'asc';
  }

  async init(){
    const tasks = await this.taskService.getAll();
    if (tasks){
      console.log(tasks);
      TasksView.resetTasksList();
      const orderTasks = sortCollection(tasks,this.sortBy,this.sortDirection);
      orderTasks.forEach(element => {
        TasksView.renderCard(element);
      });
    }

    this.addEventListeners();
  };

  // Manejador de eventos de clicks en la ventana de tareas
  async handleClickEvent(e){
    const action=e.target.closest('[data-action]')?.dataset.action;
    const taskCard = e.target.closest('.task-card');
    const taskId = taskCard?.dataset?.id ? taskCard.dataset.id: null;

    if (!action){ return }
    //CRUD de tareas
    switch (action){
      case 'create':
        TasksView.openModal();
        break;
      case 'edit':
        TasksView.openModal(await this.taskService.getById(taskId));
        break;
      case 'delete':
        TasksView.openModalConfirmation( await this.taskService.getById(taskId) );
        break;
      case 'finish':
        const isCompleted = taskCard.classList.contains('completed');
        const data = { id:taskId, finished: isCompleted ? '' : 'on' }
        const updatedTask = await this.taskService.update(data);
        TasksView.updateCard(updatedTask);
        break;
    };
  };

  // Manejador de eventos de acciones de los modales
  async handleModalEvent(e){
    const { type, action, data } = e.detail;
      if (type !== 'task') return; // ignorar otros tipos de modales
      // Aquí recibes los datos del formulario
      if (action==='create') {
        const createdTask = await this.taskService.save(data);
        if (createdTask) { TasksView.renderCard(createdTask); }
      };
      if (action==='update') {
        const updatedTask = await this.taskService.update(data)
        if (updatedTask) { TasksView.updateCard(updatedTask); }
      };
      if (action==='delete') {
        const deleted = await this.taskService.delete(data.id)
        if (deleted) { TasksView.deleteCard(deleted); };
      };
  };

  // Listeners de eventos
  addEventListeners(){
    this.container.addEventListener('click', this.handleClickEvent.bind(this));
    // evento generico para los modales
    window.addEventListener('modal:confirm', (e) => this.handleModalEvent(e));
  };

}