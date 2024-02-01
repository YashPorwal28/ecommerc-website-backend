require("dotenv").config();
const sellerSchema = require('../Models/sellerSchema');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

exports.sellerSignin = async(req,res)=>{
    try{
    
        const {username , password} = req.body;
        const existingSeller = await sellerSchema.findOne({username});
  
        // check whether the seller exists or not
        if(!existingSeller){
          res.status(401).json({error : "Invalid credentials"});
        }
  
        // if existing seller then match the password
        const passwordMatch = await bcrypt.compare( password, existingSeller.passwordHash)
        
        if(!passwordMatch){
          res.status(401).json({error : "Invalid Credentials"});
        }
  
        // if signin successfull generate jwt token
        const token = jwt.sign(
          {
            userId : existingSeller.id,
            username : existingSeller.username,
            role : existingSeller.role
          },jwtSecret
        )
             // set token as a cookie in response
      res.cookie("token", token, {
        // https only to tell browsers not allows Client side scripting
        httpOnly: true,
        maxAge: 86400000,
      });
  
      res.status(200).json({ seller: existingSeller, message: "Signin Successfull" });
  
  
    }catch(err){
      res.status(401).json({error : err.message});
    }
}


exports.sellerSignup = async(req,res)=>{
    try {
        const {
          username, firstname,
          middlename,
          lastname, companyname, email, password, address, phoneNo
        } = req.body;
    
        const newSeller = new sellerSchema({
          username,
          firstname,
          middlename,
          lastname,
          companyName: companyname,
          email,
          passwordHash: password,
          address,
          phoneNo
        });
    
        console.log(newSeller);
        const savedSeller = await newSeller.save();
        res.status(201).json(savedSeller);
    
      } catch (error) {
        res.status(500).json({ "error": error.message });
      }
}