// logic for controlling the CRUD operations on task
const User = require("../models/user");
const jwt = require('jsonwebtoken');
const verifyToken = require('../middleware/auth')

const cookieExpirationTime = 3600 * 1000; // 1hour

const createTask = async (req, res) => {
  //const task = await Task.create(req.body)
  //res.status(201).json({task})
  let email = req.user;
  const task = { title: req.body.title, status: req.body.status };
  //console.log("User-", req.body.user);
  console.log("User-", email);
  try {
    let data = await User.findOne({ email }).then((_user) => {
      _user.tasks.push(task);
      console.log(_user);
      _user.save();
      return _user;
    });
    res.status(201).send(data);
  } catch (error) {
    res.status(400).send(error);
  }
  console.log("task created");
};

/*const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find({});
        res.send(tasks);
      } catch (error) {
        res.status(500).send(error);
      }
};*/

const getAllTasks = async (req, res) => {
  try {
    //let user = req.headers.auth;
    let user = req.user;
    let tasks = await User.findOne({ email: user }).then((_user) => {
      return _user.tasks;
    });
    // array to store all the task and then view
    let taskarray = [];
    for (let i in tasks) {
      let eachtask = {
        title: tasks[i].title,
        status: tasks[i].status,
      };
      taskarray.push(eachtask);
    }
    res.send(taskarray);
    res.render('viewtask', { tasks: taskarray });
  } catch (error) {
    res.status(500).send(error);
  }
};

/*const getTaskById = async (req, res) => {
  try {
    const { id: taskId } = req.params;
    const task = await Task.findOne({ _id: taskId });

    if (!task) {
      return res.status(404).json({ msg: `No task with id : ${taskId}` });
    }

    res.send(task);
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateTask = async (req, res) => {
  try {
    const { id: taskId } = req.params;
    const task = await Task.findOneAndUpdate({ _id: taskId }, req.body, {
      new: true,
      runValidators: true,
    });

    if (!task) {
      return res.status(404).json({ msg: `No task with id : ${taskId}` });
    }

    res.send(task);
  } catch (error) {
    res.status(500).send(error);
  }
};*/

/*const deleteTask = async (req, res) => {
  try {
    const { id: taskId } = req.params;
    const task = await Task.findOneAndDelete({ _id: taskId });

    if (!task) {
      return res.status(404).json({ msg: `No task with id : ${taskId}` });
    }

    res.send(task);
  } catch (error) {
    res.status(500).send(error);
  }
};*/

const deleteTask = async (req, res) => {
  try {
    let user = req.headers.auth;
    //let user = req.user;
    console.log("User-", user);
    let item = req.body.taskId; // taskId=index
    console.log(item);
    await User.findOne({ email: user }).then((_user) => {
      // array to store all the task and then view
      console.log(_user.tasks);
      let taskarray = [];
      for (let i=0; i< _user.tasks.length; i++) {
        console.log(i);
        console.log(_user.tasks.at(i));
        if (i != item) {
          let eachtask = _user.tasks.at(i);
          console.log("eachtask", eachtask);
          taskarray.push(eachtask);
        }
      }
      console.log("taskarray", taskarray);
      res.send(taskarray);
      _user.tasks = taskarray;
      _user.save();
    });

  } catch (error) {
    res.status(500).send(error);
  }
};

const updateTask = async (req, res) => {
    try {
      let user = req.headers.auth;
      //let user = req.user;
      let item = req.body.taskId; // taskId=index
      await User.findOne({ email: user }).then((_user) => {
        let taskarray = [];
        for (let i=0; i< _user.tasks.length; i++) {
          if (i == item) {
            let eachtask = {
               title : req.body.title,
               status : req.body.status
            } 
            taskarray.push( eachtask);
          } 
          else {
            taskarray.push( _user.tasks.at(i));
          }
        }
        res.send(taskarray);
        _user.tasks = taskarray;
        _user.save();
        console.log("Task updated. All tasks are :", taskarray);
      });
  
    } catch (error) {
      res.status(500).send(error);
    }
  };
  
module.exports = {
  createTask,
  getAllTasks,
  updateTask,
  deleteTask,
};
