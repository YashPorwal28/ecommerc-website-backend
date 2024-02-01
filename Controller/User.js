require("dotenv").config();
const customerSchema = require("../Models/customerSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

exports.signup = async(req,res)=>{
    try {
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
    
        const newCustomer = new customerSchema({
          username,
          firstname,
          middlename,
          lastname,
          email,
          passwordHash: password,
          address,
          phoneNo,
        });
    
        console.log(newCustomer);
    
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
    
        const existingUser = await customerSchema.findOne({ username });
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