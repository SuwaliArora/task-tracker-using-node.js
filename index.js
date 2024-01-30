const express = require('express');
const path = require('path');
//const bcrypt = require('bcryptjs');
const db = require('./db');
const task = require('./models/task');
const taskRoutes = require('./routes/taskroutes');
const userRoutes = require('./routes/userRoutes');

const app = express(); // specifies that it is a express application
const port = 3000;
// convert data into json format
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set('view engine', 'ejs');

// to use css files or static files
app.use(express.static("public"));


// routes
app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/register', (req, res) => {
    res.render('register');
});

app.use('/task', taskRoutes);
app.use(userRoutes);
// end routes
  
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });