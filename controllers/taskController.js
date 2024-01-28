// logic for controlling the CRUD operations on task
const Task = require("../models/task");

const createTask = async (req, res) => {
  //const task = await Task.create(req.body)
  //res.status(201).json({task})
  const task = new Task({ ...req.body });
  console.log("User-", req.user);
  try {
    await task.save();
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find({});
        res.send(tasks);
      } catch (error) {
        res.status(500).send(error);
      }
};

const getTaskById = async (req, res) => {
    try {
        const { id:taskId } = req.params
        const task = await Task.findOne({ _id: taskId });
    
        if (!task) {
          return res.status(404).json({msg: `No task with id : ${taskId}`});
        }
    
        res.send(task);
      } catch (error) {
        res.status(500).send(error);
      }
};

const updateTask = async (req, res) => {
    try {
        const { id:taskId } = req.params
        const task = await Task.findOneAndUpdate({ _id: taskId}, req.body, {
            new: true,
            runValidators : true,
        })

    if (!task) {
        return res.status(404).json({msg: `No task with id : ${taskId}`});
      }
  
    res.send(task);
    } catch (error) {
        res.status(500).send(error);
    }

};

const deleteTask = async (req, res) => {
    try {
        const { id:taskId } = req.params
        const task = await Task.findOneAndDelete({ _id: taskId });
    
        if (!task) {
          return res.status(404).json({msg: `No task with id : ${taskId}`});
        }
    
        res.send(task);
      } catch (error) {
        res.status(500).send(error);
      }
};

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
};
