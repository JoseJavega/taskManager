import { API_URL }  from './config.js';
import { TaskController } from './controllers/Task.js';

const taskController= new TaskController(API_URL, 'tasks-section');
taskController.init();
