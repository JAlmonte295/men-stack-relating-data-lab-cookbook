const express = require('express');
const router = express.Router({ mergeParams: true });
// const bcrypt = require('bcrypt');

const User = require('../models/user.js');

//router logic vvvv

// new route
router.get('/new', (req, res) => {
  res.render('foods/new.ejs');
});

// define create route
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
    res.redirect(`/users/${req.params.userId}/foods`);
  }
});

router.get('/', async (req, res) => {
  try {
    const pantryOwner = await User.findById(req.params.userId);
    res.render('foods/index.ejs', {
      pantryOwner,
    });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

// GET /:foodId/edit - Render edit form
router.get('/:foodId/edit', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const food = user.pantry.id(req.params.foodId);
    res.render('foods/edit.ejs', {
      user,
      food,
    });
  } catch (error) {
    console.log(error);
    res.redirect(`/users/${req.params.userId}/foods`);
  }
});

// PUT /:foodId - Update a food item
router.put('/:foodId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const food = user.pantry.id(req.params.foodId);
    food.set(req.body);
    await user.save();
    res.redirect(`/users/${req.params.userId}/foods`);
  } catch (error) {
    console.log(error);
    res.redirect(`/users/${req.params.userId}/foods`);
  }
});

// DELETE /:foodId - Delete a food item
router.delete('/:foodId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    // Find the food item in the pantry and remove it
    user.pantry.id(req.params.foodId).deleteOne();
    await user.save();
    res.redirect(`/users/${req.params.userId}/foods`);
  } catch (error) {
    console.log(error);
    res.redirect(`/users/${req.params.userId}/foods`);
  }
});

// export router
module.exports = router;