import { TaskModel } from "../models/task.js";
import { validateTask, validatePartialTask } from "../schemas/task.js";


export class TaskController{
  static async getAll (req, res){
    // TO DO - opciones de parametros de filtrado
    const tasks=TaskModel.getAll();
    return res.status(200).json(tasks);
  };

  static async getById (req, res){
    const { id } = req.params;
    const task = TaskModel.getById(id);
    if (!task){
      res.status(404).json({message: 'Task not found'});
    };

    return res.status(200).json(task);
  };

  static async create (req, res){
    const validate= validateTask(req.body);
    if (validate.error){
      return res.status(400).json(validate.error);
    }
    const newTask = await TaskModel.create({input: validate.data});
    return res.status(200).json(newTask);
  };

  static async delete (req, res){
    const { id } = req.params;
    const result = TaskModel.delete(id);
    if (result===false){
      return res.status(404).json({message:'Task not found'});
    }
    return res.status(204).json({message:'Task deleted'});
  };

  static async update(req,res){
    const validate = validatePartialTask(req.body);
    if (validate.error){
      return res.status(400).json({error: 'Datos no validos o incompletos'});
    };

    const { id } = req.params;
    const taskExists = await TaskModel.getById(id);
    if (!taskExists){
      res.status(404).json({message: 'Task not found'});
    };

    const updatedTask = await TaskModel.update(id,{input: validate.data});
    return res.status(200).json(updatedTask);
  };

}

