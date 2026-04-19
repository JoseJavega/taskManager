import { TaskModel } from "../models/task.js";
import { TaskCategoryModel } from "../models/taskCategory.js";

export class TaskCategoryService {
  static async deleteCategories(categoriesId) {
    // buscamos tareas con esa categoría y seteamos categoryId a "uncategorized"
    await TaskModel.updateMany("categoryId", categoriesId, "uncategorized");
    // borramos la categoría
    const result = await TaskCategoryModel.delete(categoriesId);
    return result !== false;
  }
}
