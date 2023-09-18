const { Task } = require("../models/models");

class TaskController {
  async createTask(req, res) {
    try {
      const { name, description, status, dueDate } = req.body;
      const task = await Task.create({ name, description, status, dueDate });
      return res.status(201).json({ task });
    } catch (e) {
      res.status(500).json({ error: "Unable to create the task." });
    }
  }

  async getAllTasks(req, res) {
    try {
      const tasks = await Task.findAll();
      return res.json({ tasks });
    } catch (e) {
      res.status(500).json({ error: "Unable to get the list of tasks" });
    }
  }

  async getOneTask(req, res) {
    try {
      const taskId = req.params.id;
      const task = await Task.findByPk(taskId);
      if (!task) {
        return res.status(404).json({ error: "Task not found" });
      }
      return res.json({ task });
    } catch (e) {
      res.status(500).json({ error: "Unable to get the task you identified" });
    }
  }

  async alterTask(req, res) {
    try {
      const taskId = req.params.id;
      const taskToUpdate = await Task.findByPk(taskId);

      if (!taskToUpdate) {
        return res.status(404).json({ error: "Task not found." });
      }

      const { name, description, status, dueDate } = req.body;

      taskToUpdate.name = name;
      taskToUpdate.description = description;
      taskToUpdate.status = status;
      taskToUpdate.dueDate = dueDate;

      await taskToUpdate.save();
      res.status(200).json(taskToUpdate);
    } catch (e) {
      res.status(500).json({ error: "Unable to update the task" });
    }
  }

  async deleteTask(req, res) {
    try {
      const taskId = req.params.id;
      const taskToDelete = await Task.findByPk(taskId);

      if (!taskToDelete) {
        return res.status(404).json({ error: "Task not found." });
      }
      
      taskToDelete.destroy();
      res.status(204).send("A task was successfully deleted"); //НЕ ВЫХОДИТ???
    } catch (e) {
      res.status(500).json({ error: "Unable to delete a task" });
    }
  }
}

module.exports = new TaskController();
