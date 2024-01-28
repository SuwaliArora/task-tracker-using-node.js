const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const auth = require('../middleware/auth');


router.route('/').get(taskController.getAllTasks).post(taskController.createTask);
router.route('/:id').get(taskController.getTaskById).patch(taskController.updateTask).delete(taskController.deleteTask)

module.exports = router;