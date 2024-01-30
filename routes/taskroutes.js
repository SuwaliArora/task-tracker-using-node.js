const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const verifyToken = require('../middleware/auth')

router.route('/')
.get(verifyToken, taskController.getAllTasks)
.post(verifyToken, taskController.createTask)
.delete(verifyToken, taskController.deleteTask)
.patch(verifyToken, taskController.updateTask);
//router.route('/:id').get(taskController.getTaskById).patch(taskController.updateTask)

//router.route('/createTask').post(verifyToken, taskController.createTask)

module.exports = router;