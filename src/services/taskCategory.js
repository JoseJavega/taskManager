import { TaskModel } from "../models/task.js";
import { TaskCategoryModel } from "../models/taskCategory.js";

export class TaskCategoryService {
  static async deleteCategory(categoryId){
    const tasks = await TaskModel.getAll({categoryId});
    // si hay tareas en esa categoria no se borra
    if (tasks.length > 0) { return null }

    const result = await TaskCategoryModel.delete(categoryId);
    return result;
  }
}