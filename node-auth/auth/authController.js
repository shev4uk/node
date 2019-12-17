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

const getPasswordResetURL = (user, token) => {
  return `http://localhost:4300/password/reset/${user._id}/${token}`
}

const resetPasswordTemplate = (user, url) => {
  const from = process.env.EMAIL_LOGIN
  const to = user.email
  const subject = "🌻 Backwoods Password Reset 🌻"
  const html = `
  <p>Hey ${user.displayName || user.email},</p>
  <p>We heard that you lost your Backwoods password. Sorry about that!</p>
  <p>But don’t worry! You can use the following link to reset your password:</p>
  <a href=${url}>${url}</a>
  <p>If you don’t use this link within 1 hour, it will expire.</p>
  <p>Do something outside today! </p>
  <p>–Your friends at Backwoods</p>
  `
  return { from, to, subject, html }
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

  User.findOne({email: email})
    .then(user => {
      if (!user) {
        const error = new Error('user not found');
        error.statusCode = 401;
        throw error;
      }
      const token = generateToken(user);
      const url = getPasswordResetURL(user, token);
      const emailTemplate = resetPasswordTemplate(user, url);

      transporter.sendMail(emailTemplate, function (err, info) {
        if(err) {
          console.log(err);
          res.status(500).json(err);
        }
        else {
          console.log(info);
          res.status(200).json(info.envelope);
        }
     });
    })
    .catch(err => {
      next(err);
    })
}

exports.newPassword = (req, res, next) => {
  const userId = req.body.userId;
  const token = req.body.token;
  const password = req.body.password;

  User.findOne({ _id: userId })
    .then(user => {
      if (!user) {
        const error = new Error('Invalid or expired reset token.');
        error.statusCode = 401;
        throw error;
      }
      const payload = jwt.decode(token, 'ZsZ5skuxSEqFAUDgvIPzreezP8IOVxyq1NC');
      console.log(payload, user.id);
      if (payload.userId === user.id) {
        bcrypt.genSalt(12, (err, salt) => {
          console.log(err, salt);
          // Call error-handling middleware:
          if (err) return
          bcrypt.hash(password, salt, (err, hash) => {
            // Call error-handling middleware:
            if (err) return
            User.findOneAndUpdate({ _id: userId }, { password: hash })
              .then(() => res.status(202).json("Password changed accepted"))
              .catch(err => {
                const error = new Error(err);
                error.statusCode = 500;
                throw error;
              })
          })
        })
      }
    })
    .catch(err => {
      next(err);
    })
}
