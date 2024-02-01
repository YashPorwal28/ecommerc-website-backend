const express = require("express");
const router = express.Router();
require("dotenv").config();
const customerSchema = require("../Models/customerSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;
const {signup , signin} = require('../Controller/User') 


router.post("/signup", signup );

 router.post("/signin", signin);

module.exports = router;
