const express = require('express');
const router = express.Router();
require("dotenv").config();
const {sellerSignin, sellerSignup} = require('../Controller/Seller')



router.post("/seller-signup",  sellerSignup);
router.post('/seller-signin', sellerSignin)



module.exports = router;
