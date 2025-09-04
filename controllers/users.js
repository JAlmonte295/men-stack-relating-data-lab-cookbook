const express = require('express');
const router = express.Router();
const User = require('../models/user.js');

// GET /users - Users Index (Community Page)
router.get('/', async (req, res) => {
  try {
    const users = await User.find({});
    // The view is now in the 'users' directory
    res.render('users/index.ejs', { users });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

// GET /users/:userId - User Show Page
router.get('/:userId', async (req, res) => {
  try {
    // For now, this is a clean URL that redirects to the user's pantry
    res.redirect(`/users/${req.params.userId}/foods`);
  } catch (error) {
    console.log(error);
    res.redirect('/users');
  }
});

module.exports = router;