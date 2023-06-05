require('dotenv').config();
require('./config/database').connect();
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
var cookieParser = require('cookie-parser')

const User = require('./model/user')
const auth = require('./middleware/auth')


const app = express();
app.use(express.json());
app.use(cookieParser());

app.get('/',(req,res)=>{
    res.send('Hello from auth system');
});

app.post('/register', async (req,res) => {

  try {
    const { firstname ,lastname ,email ,password }  = req.body;

    if (!(firstname && lastname && email && password)) {
        
        res.status(401).send("All Fields Required")
    }

    const existingUser = await User.findOne({ email });
    
    if (existingUser) {
        res.status(401).send("User Already Exists");

    }

    const encryptedPassword = await bcrypt.hash(password,10)

    const user = User.create({

        firstname,
        lastname,
        email,
        password : encryptedPassword
    })

    const token = jwt.sign(
        { user_id  : user._id,email},
        process.env.SECRET_KEY,
        {
            expiresIn : "5h"
        }

    );
    user.token = token;
    user.password = undefined;
    res.status(201).json(user);
  } catch (error) {
    console.log(error);
  }
});

app.post('/login', async (req,res) => {

    try {
        const { email , password }  = req.body;

        if (!(email && password)) {
          res.status(401).send("Field is missing")
        }

        const user = await User.findOne({ email });

        if(user && (await bcrypt.compare(password,user.password))){

            const token = jwt.sign(
                { user_id: user._id, email },
                process.env.SECRET_KEY,
                {
                  expiresIn: "5h",
                }
              )
              user.token = token;
              user.password = undefined;
              
            //   without Cookies
            //   res.status(201).json(user);

            // with cookies
            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
              };
        
              res.status(200).cookie("token", token, options).json({
                success: true,
                token,
                user,
              });
    
            }
           res.status(401).send('Email or Password is Incorrect');

    } catch (error) {
        console.log(error);
    }
})

app.get('/dashboard',auth, (req,res) => {
    res.send("WELCOME TO DASHBOARD")
})


module.exports = app;