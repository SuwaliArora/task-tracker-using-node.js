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
  
// register user
/*app.post('/register', async (req, res) => {
    try{
        const data = {
            fullname: req.body.fullname,
            email: req.body.email,
            password: req.body.password
        }

        // check if the user already exist
        const existinguser = await collection.findOne({ email: data.email });

         // If the user exists
        if (existinguser) {
            console.log("User already exists with this email")
            res.send('User already exists with this email. Please choose diferent email');
        } else {
            // Hash the password using bycrypt
            const saltrounds =10; // number of salt round for bycrypt
            const hashedPassword = await bcrypt.hash(data.password, saltrounds);

            data.password =hashedPassword;
            const userdata = await collection.insertMany(data);
            console.log(userdata);

            res.send('Registration successful. <a href="/login">Login</a>');
        }
    
        
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
});*/

// login user
/*app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const checkUser = await collection.findOne({ email });  // check if user exist with entered email
        // If the user doesn't exist
        if (!checkUser) {
            return res.send('User does not exist');
        }

        // Compare the provided password with the hashed password
        const passwordMatch = await bcrypt.compare(password, checkUser.password);
        if(passwordMatch) {
            console.log("Login successful");
            res.render("tasks");
        } else {
            return res.send('Invalid password. Please try again!');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
})*/


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });