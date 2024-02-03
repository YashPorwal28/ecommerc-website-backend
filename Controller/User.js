require("dotenv").config();
const { query, validationResult } = require('express-validator');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Customer = require("../Models/customerSchema");
const jwtSecret = process.env.JWT_SECRET;

exports.signup = async(req,res)=>{
    try {
      
      const result = validationResult(req);
      console.log(result.array()[0].msg);

        if (!result.isEmpty()) {
          return res.status(400).json({errors: result.array()})
        }

        const {
          username,
          firstname,
          middlename,
          lastname,
          email,
          password,
          address,
          phoneNo,
        } = req.body;
    
        // Check if user already exists in the database

        const userExists = await Customer.findOne({email})
        if(userExists) return res.status(403).json({error : "Email is taken"})

        const userNameExists = await Customer.findOne({username})
        if(userNameExists) return res.status(403).json({error : "Username Already exists"})

        const newCustomer = new Customer({
          username,
          firstname,
          middlename,
          lastname,
          email,
          passwordHash: password,
          address,
          phoneNo,
        });
    
        // console.log(newCustomer);
    
        const savedCustomer = await newCustomer.save();
    
        res.status(200).json(savedCustomer);
      } catch (err) {
        console.log("error creating user");
        res.status(500).json({ message: err.message });
      }

}



exports.signin = async (req,res)=>{
    try {
        const { username, password } = req.body;
    
        const existingUser = await Customer.findOne({ username });
        // check whether customer exists or not
        if (!existingUser) {
          res.status(401).json({ error: "Invalid credentials" });
        }
    
        // if existing user then match the password
        const passwordMatch = await bcrypt.compare(
          password,
          existingUser.passwordHash
        );
        if (!passwordMatch) {
          res.status(401).json({ error: "Invalid Credentials" });
        }
    
        // if signin is successfull generate a jwt token
    
        const token = jwt.sign(
          {
            userId: existingUser.id,
            username: existingUser.username,
            role : existingUser.role
          },
          jwtSecret
        );
    
        // set token as a cookie in response
        res.cookie("token", token, {
          // https only to tell browsers not allows Client side scripting
          httpOnly: true,
          maxAge: 86400000,
        });
    
        res.status(200).json({ user: existingUser, message: "Sign Successfull" });
      } catch (err) {
        res.status(401).json({ error: err.message });
      }

}


// if user want to delete it's account 

exports.deleteAccount = async(req,res)=>{

    try {
        const id = req.params.id;
        const user = await Customer.findById(id)
        if(!user){
            return  res.status(400).json({error:"Internal Error"})
        }

        await user.deleteOne();

        res.status(200).json("user Deleted");

    } catch (error) {
        res.status(400).json(error.message)
    }

}

