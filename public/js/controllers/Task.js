import { TasksView } from "../views/Task.js";
import { TaskService } from "../services/Task.js";
import { TaskCategoryService } from "../services/TaskCategory.js";
import { sortCollection } from "../utils/sortCollection.js";

export class TaskController{
  constructor(apiUrl, containerId){
    this.taskService = new TaskService (apiUrl);
    this.taskCategoryService = new TaskCategoryService (apiUrl);
    this.container = document.getElementById(containerId);
    // Ordenación de tareas
    this.sortTasksBy = 'title';
    this.sortTasksDirection = 'asc';
    // Ordenación de categorías
    this.sortCategoriesBy = 'name';
    this.sortCategoriesDirection = 'asc';
  }

  async init(){
    TasksView.resetTasksList();
    const categories = await this.taskCategoryService.getAll();
    if (categories){
      const orderCategories = sortCollection(categories, this.sortCategoriesBy, this.sortCategoriesDirection);
      orderCategories.push({_id: 'uncategorized', name: 'Sin categoría'});
      orderCategories.forEach(element => {
        TasksView.renderCategory(element);
      });
    }

    const tasks = await this.taskService.getAll();
    if (tasks){
      const orderTasks = sortCollection(tasks, this.sortTasksBy, this.sortTasksDirection);
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
        const categoryList = await this.taskCategoryService.getAll();
        categoryList.unshift({_id:'none', name:'Sin Categoría'});
        TasksView.openModal(categoryList);
        break;
      case 'edit':
        TasksView.openModal(await this.taskCategoryService.getAll() , await this.taskService.getById(taskId) );
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