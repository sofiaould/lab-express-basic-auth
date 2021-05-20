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
        res.redirect('/profile',{user:userFromDB});
      })
      .catch(error => next(error));
});
router.get('/login',(req,res,next)=>{
  res.render('auth/login')
})
router.post('/login',(req,res,next)=>{
  console.log('req.session:',req.session)
  const {username, password} = req.body;
  //check si les 2 champs sont remplis
  if(username === '' || password === ''){
    res.render('auth/login',{errorMessage:'Merci de remplir les 2 champs'})
    return
  }
  User.findOne({username:username})
  .then(userFromDB=>{
    if(!userFromDB){
      res.render('auth/login',{errorMessage:'user non trouve'})
      return
    } else if (bcrypt.compareSync(password,userFromDB.hashedPassword)){
      req.session.currentUser = userFromDB;
      res.redirect('/profile')
    } else {
      res.render('auth/login',{errorMessage:'Mauvais mot de passe'})
    }
  })
  .catch(err=>next(err))
})
router.get('/profile',(req,res,next)=>{
  res.render('auth/profile',{user: req.session.currentUser})
})
module.exports = router;
