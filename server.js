const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const morgan = require('morgan');
const session = require('express-session');

// Controller Imports
const authController = require('./controllers/auth.js');
const User = require('./models/user.js');
const foodController = require('./controllers/food.js');
const usersController = require('./controllers/users.js');

// Middleware Imports
const isSignedIn = require('./middleware/is-signed-in.js');
const passUserToView = require('./middleware/pass-user-to-view.js');


const port = process.env.PORT ? process.env.PORT : '4000';

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

// =======================
// Middleware
// =======================

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
// app.use(morgan('dev'));

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Session configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

// Pass the user session information to all views
app.use(passUserToView);

// =======================
// Routes / Controllers
// =======================

// Public routes - accessible without being signed in
app.use('/auth', authController);

// index route
app.get('/', (req, res) => {
  res.render('index.ejs');
});

// Protected routes - require user to be signed in
app.use(isSignedIn);
app.use('/users', usersController);
app.use('/users/:userId/foods', foodController);

// vip route
app.get('/vip-lounge', (req, res) => {
  res.send(`Welcome to the party ${req.session.user.username}.`);
});

// =======================
// Server
// =======================
app.listen(port, () => {
  console.log(`The express app is ready on port ${port}!`);
});
