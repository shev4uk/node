const express = require('express');
const router = express.Router();
const authController = require('./authController');
const { userValidationRules, validate } = require('./authService');

// const User = require('./authModel');

router.get('/islogin', authController.isLogin);

router.post('/signin', authController.signin);

// router.post('/signup', [
//   check('email')
//     .isEmpty()
//     .isEmail()
//     .withMessage('Your email is not valid')
//     .custom((value, { req }) => {
//       return User.findOne({email: value}).then(user => {
//         if (user) {
//           return Promise.reject('Email already exists!');
//         }
//       })
//     })
//     .normalizeEmail()
// ], authController.signup);

router.post('/signup', userValidationRules(), validate, authController.signup);

module.exports = router;