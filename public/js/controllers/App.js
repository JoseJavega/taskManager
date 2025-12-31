import { API_URL }  from '../config.js';
import { TaskController } from './Task.js';
import { TaskCategoryController } from './TaskCategory.js';

export class AppController{
  constructor (){
    this.taskController = new TaskController(API_URL, 'tasks-section');
    this.taskCategoryController = new TaskCategoryController(API_URL, 'tasks-section');

  }

  async init(){
    await this.taskCategoryController.init();
    await this.taskController.init();
  }
}