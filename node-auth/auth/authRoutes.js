const express = require('express');
const router = express.Router();
const authController = require('./authController');
const { userValidationSignup, validateSignup, userValidationSignin, validateSignin } = require('./authService');

router.post('/signin', userValidationSignin(), validateSignin, authController.signin);

router.post('/signup', userValidationSignup(), validateSignup, authController.signup);

router.post('/reset-password', authController.resetPassword);

router.post('/new-password', authController.newPassword);

router.post('/verification', authController.verificationUser);

module.exports = router;