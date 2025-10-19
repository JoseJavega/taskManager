import { TasksView } from "../views/Task.js";

export class TaskController{
  constructor(apiUrl, containerId){
    this.apiClient= `${apiUrl}/tasks`;
    this.container = document.getElementById(containerId);
  }

  async init(){
    const tasks = await this.getTasks();
    if (tasks){
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

  async handleClickEvent(e){
    const id = e.target.closest('.task-card')?.dataset.id;
    if (id){
      console.log(await this.getTaskById(id));
    }

    if (e.target.id==="task-new"){
      TasksView.openModal();
    }
  }

  addEventListeners(){
    this.container.addEventListener('click', this.handleClickEvent.bind(this));

    // evento generico para el modal
    window.addEventListener('modal:confirm', (event) => {
      const { type, data } = event.detail;
      if (type !== 'task') return; // ignorar otros tipos de modales
      // Aquí recibes los datos del formulario
      console.log('Datos de tarea:', data);
    });
  }


}