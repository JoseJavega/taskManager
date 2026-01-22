import { TaskModel } from "../models/task.js";
import { TaskCategoryModel } from "../models/taskCategory.js";

export class TaskCategoryService {
  static async deleteCategory(categoryId) {
      // buscamos tareas con esa categoría y seteamos categoryId a "uncategorized"
      await TaskModel.updateMany( "categoryId", categoryId, "uncategorized" );
      // borramos la categoría
      const result = await TaskCategoryModel.delete(categoryId);
      return result !==false;
  }
}
