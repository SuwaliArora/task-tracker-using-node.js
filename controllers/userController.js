const collection = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const verifyToken = require('../middleware/auth')

const cookieExpirationTime = 3600 * 1000;

// register user
const register =  async (req, res) => {
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
           // const userdata = await collection.insertMany(data);
            //console.log(userdata);

            //res.send('Registration successful. <a href="/login">Login</a>');
            let registeredUser = await collection(data).save().then(_user => _user) 
            let userID = {
                user_Id : registeredUser.email
            }
            console.log("email id", userID);
            // create a token using email id
            let token = jwt.sign(userID , "secretkey" , {expiresIn : '3000s'});
            console.log("token", token)
            res.cookie("cookie created" , token , {
                expires : new Date(Date.now() + cookieExpirationTime),
                httpOnly : true,
            })
            console.log("registration successful")
            res.status(201).render('tasks');
        }
    
        
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
};

// login user
const login =  async (req, res) => {
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
            let userID = {
                user_Id: checkUser.email
            }
            // create a token using email id
            let token = jwt.sign(userID , "secretkey" , {expiresIn : '3000s'});
            console.log("token", token)

            res.cookie("cookie created" , token , {
                expires : new Date(Date.now() + cookieExpirationTime),
                httpOnly : true,
            })

            console.log("Login successful");
            res.render("tasks");
        } else {
            return res.send('Invalid password. Please try again!');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = { register, login };
