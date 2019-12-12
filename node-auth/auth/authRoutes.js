const express = require('express');
const router = express.Router();
const authController = require('./authController');
const { userValidationSignup, validateSignup, userValidationSignin, validateSignin } = require('./authService');

router.post('/signin', userValidationSignin(), validateSignin, authController.signin);

router.post('/signup', userValidationSignup(), validateSignup, authController.signup);

module.exports = router;