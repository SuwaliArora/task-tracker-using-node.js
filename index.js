const express = require('express');
const path = require('path');
const db = require('./db');
const taskRoutes = require('./routes/taskroutes');
const userRoutes = require('./routes/userRoutes');

require('dotenv').config();

const app = express(); 
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