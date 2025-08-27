const express = require('express');
const router = express.Router();
// const bcrypt = require('bcrypt');

const User = require('../models/user.js');

//router logic vvvv

// router.get
router.get('/', (req, res) => {
    res.render('foods/index.ejs', {
  });
});


// export router
module.exports = router;