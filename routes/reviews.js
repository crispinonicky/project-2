const express = require('express');
const router  = express.Router();
// const nodemailer = require('nodemailer');


// https://www.google.com/settings/security/lesssecureapps
// use this link to enable nodemailer to access your gmail account


/* GET home page */
router.get('/reviews', (req, res, next) => {
  res.render('reviewViews/index');
});

router.get('/reviews/new', (req, res, next)=>{
  res.render('reviewViews/create');

})


module.exports = router;