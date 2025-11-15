import { randomUUID } from 'node:crypto';
import { Tasks } from "../DB/DB_schemas.js";

export class TaskModel {

  static create({input}){
    const newTask = {
      _id: randomUUID(),
      title: input.title,
      description: input.description,
      categoryId: input.categoryId,
      createdAt: new Date().toISOString(),
    };
    Tasks.create(newTask).save();
    return newTask;
  };

  static async update(taskId, input){
    const taskExists = await this.getById(taskId);
    if (!taskExists){ return null; };

    // lee los datos del input y se guardan en inputData
    const {title, description,categoryId, completed, createdAt, updatedAt, finishedAt} = input;
    const inputData = {title, description, categoryId, completed, createdAt, updatedAt, finishedAt};
    // inputData trae campos undefined que sobre escribirian los de la task al hacer el merge
    // Object.entries(inputData) -> combierte el objeto inputData en array tipo [["name", "Ana"], ["age", 30]] para poder filtrarlo
    // Object.fromEntries(array) -> combierte un array como el anterior, nuevamente en objeto
    const cleanInputData = Object.fromEntries( Object.entries(inputData).filter(([_, value]) => value !== undefined) );
    //añadimos siempre updatedAt
    cleanInputData.updatedAt = new Date().toISOString();

    // revisamos si cambia el estado de completed y actualizamos finishedAt
    if ('completed' in cleanInputData) {
      const newCompleted = cleanInputData.completed;
      const oldCompleted = !!taskExists.completed; // la doble !! convierte a boolean

      if ( oldCompleted===false && newCompleted===true ) { cleanInputData.finishedAt = new Date().toISOString(); }
      if ( oldCompleted===true && newCompleted===false ){ delete taskExists.finishedAt }
    }

    await taskExists.update( cleanInputData ).save();
    const fullTask = await this.getById(taskId);
    return fullTask;
  };

  static async delete(taskId){
    const taskExists = await this.getById(taskId);
    if (!taskExists){ return false; };

    Tasks.remove(taskId);
    return taskId;
  }

  static async getById(taskId){
    return await Tasks.findOne({ _id: taskId});
  }

  static async getAll(filters={}){
    const query={};
    if (filters.categoryId) { query.categoryId = filters.categoryId; }

    return await Tasks.find(query);
  }
}