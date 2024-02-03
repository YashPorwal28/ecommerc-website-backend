const express = require('express');
const { getAllUsers ,getAllSellers } = require('../Controller/Admin');
const router = express.Router();
require("dotenv").config();



router.get("/getAllUsers", getAllUsers);
router.get("/getAllSellers", getAllSellers);



module.exports= router;