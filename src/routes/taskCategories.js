import { Router } from "express";
import { TaskCategoryController } from "../controllers/taskCategory.js";

export const taskCategoriesRouter = Router();

taskCategoriesRouter.post("/", TaskCategoryController.create);
// delete usa metodo POST porque espera un arry que llega por req.body
taskCategoriesRouter.post("/delete", TaskCategoryController.delete);
taskCategoriesRouter.get("/", TaskCategoryController.getAll);
taskCategoriesRouter.get("/:id", TaskCategoryController.getById);
taskCategoriesRouter.patch("/:id", TaskCategoryController.update);
