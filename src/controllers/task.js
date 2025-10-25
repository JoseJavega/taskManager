import { TaskModel } from "../models/task.js";
import { validateTask, validatePartialTask } from "../schemas/task.js";


export class TaskController{
  static async getAll (req, res){
    // TO DO - opciones de parametros de filtrado
    const tasks= await TaskModel.getAll();
    res.status(200).json(tasks);
  };

  static async getById (req, res){
    const { id } = req.params;
    const task = await TaskModel.getById(id);
    if (!task){
      res.status(404).json({message: 'Task not found'});
    };

    res.status(200).json(task);
  };

  static async create (req, res){
    const validate= validateTask(req.body);
    if (validate.error){
      res.status(400).json(validate.error);
    }
    const newTask = TaskModel.create({input: validate.data});
    res.status(201).json(newTask);
  };

  static async delete (req, res){
    const { id } = req.params;
    const result = await TaskModel.delete(id);
    if (result===false){
      res.status(404).json({message:'Task not found'});
    }
    res.status(204).end();
  };

  static async update(req,res){
    const validate = validatePartialTask(req.body);
    if (validate.error){
      res.status(400).json({error: 'Datos no validos o incompletos'});
    };

    const { id } = req.params;
    const updatedTask = await TaskModel.update(id, validate.data);
    if (!updatedTask){
      res.status(404).json({message: 'Task not found'});
    };
    res.status(200).json(updatedTask);
  };

}

