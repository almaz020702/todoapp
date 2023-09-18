const Router = require('express');
const router = new Router();
const taskController = require('../controllers/taskController')

router.get('/tasks', taskController.getAllTasks)
router.post('/tasks', taskController.createTask)
router.get('/tasks/:id', taskController.getOneTask)
router.put('/tasks/:id', taskController.alterTask)
router.delete('/tasks/:id', taskController.deleteTask)

module.exports = router