const { body, validationResult } = require('express-validator');
const User = require('./authModel');

const userValidationRules = () => {
  return [
    // username must be an email
    body('email')
      .isEmail()
      .custom((value, { req }) => {
        return User.findOne({email: value}).then(user => {
          if (user) {
            return Promise.reject('Email already exists!');
          }
        })
      })
      .normalizeEmail()
      ,
    // password must be at least 5 chars long
    body('password').isLength({ min: 5 }),
  ]
}

const validate = (req, res, next) => {
  // const errors = validationResult(req)
  // if (errors.isEmpty()) {
  //   return next()
  // }
  // const extractedErrors = []
  // errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

  // return res.status(422).json({
  //   errors: extractedErrors,
  // })
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed.');
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }
  return next();
}

module.exports = {
  userValidationRules,
  validate,
}