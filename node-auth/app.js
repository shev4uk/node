require('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
// const MongoDBStore = require('connect-mongodb-session')(session);
const mongoose = require('mongoose');

const app = express();
// const store = new MongoDBStore({
//   uri: process.env.DB_HOST,
//   collection: 'sessions'
// })

// Routes
const authRoutes = require('./auth/authRoutes');

// cors
app.use(cors());

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json());

app.use('/auth', authRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({message: message, data: data});
})

mongoose.connect(process.env.DB_HOST, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connect');
});

// app.use(session({
//   secret : 'test',
//   resave: true,
//   saveUninitialized: true,
//   store: store
// })); 

app.listen(process.env.PORT);