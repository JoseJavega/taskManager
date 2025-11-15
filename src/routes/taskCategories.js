import { Router } from "express";
import { TaskCategoryController } from "../controllers/taskCategory.js";

export const taskCategoriesRouter = Router();

taskCategoriesRouter.post('/', TaskCategoryController.create);
taskCategoriesRouter.delete('/:id', TaskCategoryController.delete);
taskCategoriesRouter.get('/:id', TaskCategoryController.getById);
taskCategoriesRouter.get('/',TaskCategoryController.getAll);
taskCategoriesRouter.patch('/:id', TaskCategoryController.update);