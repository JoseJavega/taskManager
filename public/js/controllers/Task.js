import { TasksView } from "../views/Task.js";

export class TaskController{
  constructor(apiUrl, containerId){
    this.apiClient= `${apiUrl}/tasks`;
    this.container = document.getElementById(containerId);
  }

  async init(){
    const tasks = await this.getTasks();
    if (tasks){
      TasksView.resetTasksList();
      tasks.forEach(element => {
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
    try {
      const result = await fetch(this.apiClient, {
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

  async deleteTask(id){
    try {
      await fetch(`${this.apiClient}/${id}`,{
        method: 'DELETE'
      });
     console.log('Task deleted');

    } catch (error) {

    }
  }

  async handleClickEvent(e){
    const action=e.target.closest('[data-action]')?.dataset.action;
    const data = e.target.closest('.task-card')?.dataset.id;
    if (!action){
      return;
    }
    //CRUD de tareas
    switch (action){
      case 'create':
        TasksView.openModal();
        break;
      case 'edit':
        console.log('editando tarea');
        TasksView.openModal(data);
        break;
      case 'delete':
        this.deleteTask(data);
        TasksView.deleteCard(data);
        break;
      case 'finish':
        console.log('tarea finished');
        break;
    }

  }

  addEventListeners(){
    this.container.addEventListener('click', this.handleClickEvent.bind(this));

    // evento generico para el modal
    window.addEventListener('modal:confirm', (event) => {
      const { type, data } = event.detail;
      if (type !== 'task') return; // ignorar otros tipos de modales
      // Aquí recibes los datos del formulario
      this.saveTask(data);
    });
  }


}