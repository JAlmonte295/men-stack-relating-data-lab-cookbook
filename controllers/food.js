const express = require('express');
const router = express.Router();
// const bcrypt = require('bcrypt');

const User = require('../models/user.js');

//router logic vvvv

// index route
router.get('/', (req, res) => {
    res.render('foods/index.ejs', {
  });
});

// new route
router.get('/new', (req, res) => {
  res.render('foods/new.ejs');
});

// create route ???vvv
router.post('/', async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.userId, {
      $push: {
        pantry: req.body,
      },
    });
    res.redirect(`/users/${req.params.userId}/foods`);
  } catch (error) {
    console.log(error);
    res.redirect(`/users/${req.params.userId}/foods/new`);
  }
});

// export router
module.exports = router;