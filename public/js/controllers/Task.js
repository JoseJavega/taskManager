import { TasksView } from "../views/Task.js";
import { sortCollection } from "../utils/sortCollection.js";

export class TaskController{
  constructor(apiUrl, containerId){
    this.apiClient= `${apiUrl}/tasks`;
    this.container = document.getElementById(containerId);
    this.sortBy = 'title';
    this.sortDirection= 'asc';
  }

  async init(){
    const tasks = await this.getTasks();
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

  async getTasks(){
    try {
      const result= await fetch(this.apiClient);
      const data= await result.json();
      return data;
    } catch (error) {
      console.log('error:',error);
    };
  };

  async getTaskById(id){
    try {
      const result= await fetch(`${this.apiClient}/${id}`);
      const data= await result.json();
      return data
    } catch (error) {
      console.log('error:',error);
    };
  };

  async saveTask(data) {
    if (!data) { return };
    try {
      const result = await fetch(`${this.apiClient}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: data.title,
          description: data.description
        })
      });

      const newTask= await result.json()
      TasksView.renderCard(newTask);
    } catch (error) {
      console.error(error);
    }
  }

  async updateTask(data){
    if (!data.id) { return }
    const taskCompleted = data.finished==='on'? true : false;
    try {
      const result = await fetch(`${this.apiClient}/${data.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: data.title,
          description: data.description,
          completed: taskCompleted
        })
      });

      const updateTask= await result.json()
      TasksView.updateCard(updateTask);
    } catch (error) {
      console.log(error);
    }
  }

  async deleteTask(id){
    try {
      await fetch(`${this.apiClient}/${id}`,{
        method: 'DELETE'
      });
     return id;
    } catch (error) {
      throw new Error(error);
    };
  }

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
        TasksView.openModal(await this.getTaskById(taskId));
        break;
      case 'delete':
        TasksView.openModalConfirmation( await this.getTaskById(taskId) );
        break;
      case 'finish':
        const isCompleted = taskCard.classList.contains('completed');
        const data = { id:taskId, finished: isCompleted ? '' : 'on' }
        this.updateTask(data);
        break;
    };
  };

  // Manejador de eventos de acciones de los modales
  async handleModalEvent(e){
    const { type, action, data } = e.detail;
      if (type !== 'task') return; // ignorar otros tipos de modales
      // Aquí recibes los datos del formulario
      if (action==='create') { this.saveTask(data) };
      if (action==='update') { this.updateTask(data) };
      if (action==='delete') {
        const deleted = await this.deleteTask(data.id)
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