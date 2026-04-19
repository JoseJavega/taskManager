import { randomUUID } from "node:crypto";
import { TaskCategories } from "../DB/DB_schemas.js";

export class TaskCategoryModel {
  static create({ input }) {
    try {
      const newCategory = {
      _id: randomUUID(),
      name: input.name,
      };

      TaskCategories.create(newCategory).save();
      return newCategory;

    } catch (error) {
      throw error
    }
     
  }

  static async update(taskCategoryId, input) {
    const categoryExists = await this.getById(taskCategoryId);
    if (!categoryExists) {
      return null;
    }

    await categoryExists.update(input).save();
    const categoryUpdated = await this.getById(taskCategoryId);
    return categoryUpdated;
  }

  static async delete(taskCategoriesId) {
    const categoriesToDelete = await TaskCategories.find({"_id": {$in: taskCategoriesId}});
    if (!categoriesToDelete) return false;

    try {
      categoriesToDelete.forEach( (category) => {
        TaskCategories.remove(category._id);
      }); 
    } catch (error) {
      return error;
    };
  };

  static async getById(taskCategoryId) {
    return await TaskCategories.findOne({ _id: taskCategoryId });
  }

  static async getAll(filters = {}) {
    return await TaskCategories.find(filters);
  }
}
