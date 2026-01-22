import { TaskCategoryModel } from "../models/taskCategory.js";
import { validateTaskCategory } from "../schemas/taskCategory.js";
import { TaskCategoryService } from "../services/taskCategory.js";

export class TaskCategoryController {
  static async getAll(req, res) {
    const categories = await TaskCategoryModel.getAll();
    res.status(200).json(categories);
  }

  static async getById(req, res) {
    const { id } = req.params;
    const category = await TaskCategoryModel.getById(id);
    if (!category) {
      res.status(404).json({ message: "Category not found" });
      return;
    }
    res.status(200).json(category);
  }

  static async create(req, res) {
    const validate = validateTaskCategory(req.body);
    if (validate.error) {
      res.status(400).json(validate.error);
      return;
    }
    const newCategory = TaskCategoryModel.create({ input: validate.data });
    res.status(201).json(newCategory);
  }

  static async delete(req, res) {
    const { id } = req.params;
    const result = await TaskCategoryService.deleteCategory(id);
    if (result === false)
      return res.status(404).json({ message: "Category not found" });
    res.status(204).end();
  }

  static async update(req, res) {
    const validate = validateTaskCategory(req.body);
    if (validate.error) {
      res.status(400).json({ error: "Datos no validos o incompletos" });
      return;
    }

    const { id } = req.params;
    const updatedCategory = await TaskCategoryModel.update(id, validate.data);
    if (!updatedCategory) {
      res.status(404).json({ message: "Category not found" });
      return;
    }
    res.status(200).json(updatedCategory);
  }
}
