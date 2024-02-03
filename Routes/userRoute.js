const express = require("express");
const { query, validationResult } = require('express-validator');
const router = express.Router();
require("dotenv").config();
const {signup , signin, deleteAccount} = require('../Controller/User'); 
const { CustomerSignupValidator } = require("../Validator");



router.post("/signup", CustomerSignupValidator ,signup);

router.post("/signin", signin);
router.delete('/delacc/:id', deleteAccount)





module.exports = router;
