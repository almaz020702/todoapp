const { Task } = require("../models/models");
const cookie = require ('cookie');
const jwt = require('jsonwebtoken')

class TaskController {
  async createTask(req, res) {
    try {
      const { name, description, status, dueDate, UserId } = req.body;
      const task = await Task.create({
        name,
        description,
        status,
        dueDate,
        UserId,
      });
      return res.status(201).json({ task });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  async getAllTasks(req, res) {
    try {
      const cookies = req.cookies
      const accessToken = cookies.accessToken;
      const decoded = jwt.verify(accessToken, process.env.SECRET_KEY)
      const UserId = decoded.id

      const tasks = await Task.findAll({where: {UserId}});
      return res.json({ tasks });
    } catch (e) {
      res.status(500).json({ error: e.message });
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
