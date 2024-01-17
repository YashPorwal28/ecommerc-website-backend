const express = require('express')
const router = express.Router();
const authenticateSeller  = require('../Authentication/authenticateSeller')
const authorizationSeller = require('../Authorization/authorizationSeller')



// creating a new product
rotuer.post("/add-products", authenticateSeller , authorizationSeller, async (req,res)=>{
    try{
        const {name , description }
    }
})




