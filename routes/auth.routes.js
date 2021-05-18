/** @format */

const express = require("express");
const User = require("../models/User.model");
const router = express.Router();
const bcrypt= require('bcryptjs');
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds)


router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

router.post('/signup', (req, res, next) => {
  const { username, password } = req.body;

  const hashedPassword = bcrypt.hashSync(password, salt)
  console.log(`Password hash: ${hashedPassword}`);  

  User.create({
      username: username,
      hashedPassword:hashedPassword
    })
      .then(userFromDB => {
        console.log('Newly created user is: ', userFromDB)
        res.redirect ('/');
      })
      .catch(error => next(error));
});
module.exports = router;
