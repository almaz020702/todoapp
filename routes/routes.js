const Router = require('express');
const router = new Router();
const taskController = require('../controllers/taskController');
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/tasks', authMiddleware, taskController.getAllTasks)
router.post('/tasks', authMiddleware, taskController.createTask)
router.get('/tasks/:id', authMiddleware, taskController.getOneTask)
router.put('/tasks/:id', authMiddleware, taskController.alterTask)
router.delete('/tasks/:id', authMiddleware, taskController.deleteTask)
router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.post('/logout', userController.logout)

module.exports = router