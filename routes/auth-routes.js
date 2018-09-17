// routes/auth-routes.js
const express = require("express");
const router = express.Router();

// User model
const User = require("../models/User");

const bcrypt = require("bcryptjs");

const bcryptSalt = 10;

const passport = require('passport');

const ensureLogin = require("connect-ensure-login");



router.get("/signup", (req, res, next) => {
    res.render("userViews/signup");
  });
  


  router.post("/signup", (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const address = req.body.address;
  
    if (username === "" || password === "") {
      req.flash('error', 'please specify a username and password to sign up')
      res.render("userViews/signup", { message: req.flash("error") });
      return;
    }
  
    User.findOne({ username })
    .then(user => {
      if (user !== null) {
        res.render("userViews/signup", { message: req.flash("error") });
        return;
      }
  
      const salt = bcrypt.genSaltSync(bcryptSalt);
      const hashPass = bcrypt.hashSync(password, salt);
  
      User.create({
          username: username,
          password: hashPass,
          email: email,
          firstname: firstname,
          lastname: lastname,
          address: address,
      })
      .then((response)=>{
        res.redirect("/");
      })
      .catch((err)=>{
        res.render("userViews/signup", { message: req.flash("error") });
      })
    })
    .catch(error => {
      next(error)
    })
  });

  router.get('/profiles' , ensureLogin.ensureLoggedIn('/login'),(req, res, next)=>{
    console.log(req.user);
    res.render('userViews/profile', {message: req.flash('success'), theUser: req.user})
  })

  router.get('/login', (req, res, next)=>{
      res.render('userViews/login', {message: req.flash('error')})
  })

  router.post('/login', passport.authenticate('local', {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
    successFlash: true,
    passReqToCallback: true
  }));


  router.get('/logout', (req, res, next)=>{
      req.logout()
    res.redirect('/')
  })

  // authRoutes.get("/private-page", ensureLogin.ensureLoggedIn(), (req, res) => {
  //   res.render("private", { user: req.user });
  // });


module.exports = router;