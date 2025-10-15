import { Router } from "express";
import { TaskController } from "../controllers/task.js";

export const tasksRouter = Router();

tasksRouter.post('/', TaskController.create);
tasksRouter.delete('/:id', TaskController.delete);
tasksRouter.get('/:id', TaskController.getById);
tasksRouter.get('/',TaskController.getAll);