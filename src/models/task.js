import { randomUUID } from 'node:crypto';
import { Tasks } from "../DB/DB_schemas.js";

export class TaskModel {

  static create({input}){
    const newTask = {
      _id: randomUUID(),
      title: input.title,
      description: input.description,
      createdAt: new Date().toISOString()
    };
    Tasks.create(newTask).save();
    return newTask._id;
  };

  static update(taskId,{title, description, completed }){}

  static delete(taskId){
    const taskExists = this.getById(taskId);
    if (!taskExists){ return false; };

    Tasks.remove(taskId);
    return taskId;
  }

  static getById(taskId){
    return Tasks.findOne({ _id: taskId});
  }

  static getAll(filters={}){
  }
}