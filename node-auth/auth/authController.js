const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('./authModel');

exports.signin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  let loadedUser;
  User.findOne({email: email})
    .then(user => {
      console.log(user);
      if (!user) {
        const error = new Error('user not found');
        error.statusCode = 401;
        throw error;
      }
      loadedUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then(isEqual => {
      if (!isEqual) {
        const error = new Error('wrong password');
        error.statusCode = 401;
        throw error;
      }
      const token = jwt.sign(
        {
          email: loadedUser.email,
          userId: loadedUser._id.toString()
        },
        'ZsZ5skuxSEqFAUDgvIPzzP8IOVxyq1NC',
        { expiresIn: '1h'});
      res.status(200).json({token: token, userId: loadedUser._id.toString()})
    })
    .catch(err => {
      if(!err.statusCode) {
        err.statusCode = 500;
      }
    })
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
    .then(() => {
      res.status(201).json({message: 'create new user'})
    })
    .catch( err => {
      next(err);
    })
}