import { randomUUID } from "node:crypto";
import { TaskCategories } from "../DB/DB_schemas.js";

export class TaskCategoryModel {

  static create({input}){
    const newCategory = {
      _id: randomUUID(),
      name: input.name
    };
    TaskCategories.create(newCategory).save();
    return newCategory;
  };

  static async update (taskCategoryId, input){
    const categoryExists = await this.getById(taskCategoryId);
    if (!categoryExists) { return null };

    await categoryExists.update(input).save();
    const categoryUpdated = await this.getById(taskCategoryId);
    return categoryUpdated;
  };

  static async delete (taskCategoryId){
    const categoryExists = await this.getById(taskCategoryId);
    if (!categoryExists){ return false; };

    TaskCategories.remove(taskCategoryId);
    return taskCategoryId;
  };

  static async getById (taskCategoryId){
    return await TaskCategories.findOne({ _id: taskCategoryId});
  };

  static async getAll (filters={}){
    return await TaskCategories.find();
  };
}