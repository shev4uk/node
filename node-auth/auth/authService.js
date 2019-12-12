const { body, validationResult } = require('express-validator');
const User = require('./authModel');

const userValidationSignup = () => {
  return [
    body('email', 'Invalid email')
      .isEmail()
      .custom((value, { req }) => {
        return User.findOne({email: value}).then(user => {
          if (user) {
            return Promise.reject('Email already exists!');
          }
        })
      }),
    body('password', 'invalid password')
      .isLength({ min: 8 }).withMessage('Password minimum 8')
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, 'i').withMessage('Password least one letter, one number and one special character')
      .custom((value, { req }) => {
        if (value !== req.body.passwordConfirm) {
            throw new Error('Password confirmation does not match password');
          } else {
            return value;
        }
      })  
    ]
}
const validateSignup = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed.');
    error.statusCode = 422;
    error.data = errors.array().map(err => ({msg: err.msg, param: err.param}));
    throw error;
  }
  return next();
}

const userValidationSignin = () => {
  return [
    body('email', 'Invalid email')
      .isEmail()
      .bail(),
    body('password', 'invalid password')
      .isLength({ min: 8 }).withMessage('Password minimum 8')
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, 'i').withMessage('Password least one letter, one number and one special character') 
    ]
}
const validateSignin = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Incorrect username or password');
    error.statusCode = 401;
    error.data = errors.array().map(err => ({msg: err.msg, param: err.param}));
    throw error;
  }
  return next();
}

module.exports = {
  userValidationSignup,
  validateSignup,
  userValidationSignin,
  validateSignin
}