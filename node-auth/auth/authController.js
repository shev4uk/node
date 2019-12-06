const bcrypt = require('bcryptjs');

const User = require('./authModel');

exports.isLogin = (req, res, next) => {
  return res.json({status: true})
}

exports.signin = (req, res, next) => {
  return res.json({title: 'signin'})
}

exports.signup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  bcrypt
    .hash(password, 12)
    .then(hashedPw => {
      const user = new User({
        email: email,
        password: hashedPw
      });
      return user.save();
    })
    .then(result => {
      res.status(201).json({msq: 'create new user'})
    })
    .catch( err => {
      console.log(err);
      next(err);
    })
}