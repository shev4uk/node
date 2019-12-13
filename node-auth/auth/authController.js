const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const User = require('./authModel');

const generateToken = (loadedUser) => {
  return jwt.sign(
    {
      email: loadedUser.email,
      userId: loadedUser._id.toString()
    },
    'ZsZ5skuxSEqFAUDgvIPzzP8IOVxyq1NC',
    { expiresIn: '1h'});
}

exports.signin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  let loadedUser;
  User.findOne({email: email})
    .then(user => {
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
      const token = generateToken(loadedUser);
      res.status(200).json({token: token, userId: loadedUser._id.toString()})
    })
    .catch(err => {
      next(err);
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
    .then((user) => {
      const token = generateToken(user);
      res.status(201).json({token: token, userId: user._id.toString(), message: 'create new user'})
    })
    .catch(err => {
      next(err);
    })
}

exports.resetPassword = (req, res, next) => {
  const email = req.body.email;
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
           user: 'test.db.firebase@gmail.com',
           pass: 'firebase_1144'
       }
   });
  const mailOptions = {
    from: 'sender@email.com', // sender address
    to: email, // list of receivers
    subject: 'Subject of your email', // Subject line
    html: '<p>Your html here</p>'// plain text body
  };
  transporter.sendMail(mailOptions, function (err, info) {
    if(err) {
      console.log(err);
      res.status(500).json(err);
    }
    else {
      console.log(info);
      res.status(200).json(info.envelope);
    }
 });
}
