import { Router } from "express";
import { TaskController } from "../controllers/task.js";

export const tasksRouter = Router();

tasksRouter.post('/', TaskController.create);