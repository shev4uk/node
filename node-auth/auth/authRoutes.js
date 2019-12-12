const express = require('express');
const router = express.Router();
const authController = require('./authController');
const { userValidationRules, validate } = require('./authService');

router.post('/signin', authController.signin);

router.post('/signup', userValidationRules(), validate, authController.signup);

module.exports = router;