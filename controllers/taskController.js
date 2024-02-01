// logic for controlling the CRUD operations on task
const User = require("../models/user");
const verifyToken = require('../middleware/auth')


const createTask = async (req, res) => {
  let email = req.user; 
  const task = { title: req.body.title, status: req.body.status, enddate: req.body.enddate };
  console.log("User-", email);
  try {
    let data = await User.findOne({ email }).then((_user) => {
      _user.tasks.push(task);
      console.log(_user);
      _user.save();
      return _user;
    });
   //res.status(201).send(data);
   res.redirect('/task/viewtask');
  } catch (error) {
    res.status(400).send(error);
  }
  console.log("task created");
};

const getAllTasks = async (req, res) => {
  try {
    //let user = req.headers.auth;
    let user = req.user;
    let tasks = await User.findOne({ email: user }).then((_user) => {
      return _user.tasks;
    });
    // array to store all the task and then view
    let taskarray = [];
    for (let i=0; i< tasks.length; i++) {
      let eachtask = {
        index: i,
        title: tasks.at(i).title,
        status: tasks.at(i).status,
        enddate: tasks.at(i).enddate,
      };
      taskarray.push(eachtask);
    }
    console.log(taskarray);
   // res.send(taskarray);
    res.render('viewtask', { tasks: taskarray });
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteTask = async (req, res) => {
  try {
    let user = req.user;
    //console.log("User-", user);
    let item = req.body.taskId; // taskId=index
    await User.findOne({ email: user }).then((_user) => {
      // array to store all the task and then view
      console.log(_user.tasks);
      let taskarray = [];
      for (let i=0; i< _user.tasks.length; i++) {
        console.log(_user.tasks.at(i));
        if (i != item) {
          let eachtask = _user.tasks.at(i);
          taskarray.push(eachtask);
        }
      }
      console.log("taskarray", taskarray);
     // res.send(taskarray);
      _user.tasks = taskarray;
      _user.save();
      res.redirect('/task/viewtask');
    });

  } catch (error) {
    res.status(500).send(error);
  }
};

const updateTask = async (req, res) => {
    try {
      //let user = req.headers.auth;
      let user = req.user;
      let item = req.body.taskId; // taskId=index
      await User.findOne({ email: user }).then((_user) => {
        let taskarray = [];
        for (let i=0; i< _user.tasks.length; i++) {
          if (i == item) {
            let eachtask = {
               title : req.body.title,
               status : req.body.status,
               enddate : req.body.enddate
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
