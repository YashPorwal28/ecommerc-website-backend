const { body} = require('express-validator');

exports.CustomerSignupValidator =[
    body('username', 'Username is required').notEmpty(),
    body('firstname', 'First name is required').notEmpty(),
    body('middlename', 'Middle name is required').notEmpty(),
    body('lastname', 'Last name is required').notEmpty(),
    body('email', 'Valid email is required').isEmail(),
    body('password', 'Password is required').notEmpty(),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('address', 'Address is required').notEmpty(),
    body('phoneNo', 'Phone number is required').notEmpty(),
    body('phoneNo').isMobilePhone().withMessage('Invalid phone number'),

]