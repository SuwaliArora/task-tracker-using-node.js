const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const verifyToken = require('../middleware/auth')

router.route('/createtask').post(verifyToken, taskController.createTask)
router.route('/viewtask').get(verifyToken, taskController.getAllTasks)
router.route('/deletetask').post(verifyToken, taskController.deleteTask)
router.route('/updatetask').patch(verifyToken, taskController.updateTask)
module.exports = router;