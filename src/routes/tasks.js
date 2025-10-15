import { Router } from "express";
import { TaskController } from "../controllers/task.js";

export const tasksRouter = Router();

tasksRouter.post('/', TaskController.create);
tasksRouter.delete('/', TaskController.delete);
tasksRouter.get('/:id', TaskController.getById);