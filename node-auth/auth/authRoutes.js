const express = require('express');
const router = express.Router();
const authController = require('./authController');

router.get('/islogin', authController.isLogin);

router.post('/signin', authController.signin);

router.post('/signup', authController.signup);

module.exports = router;