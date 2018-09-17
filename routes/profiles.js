const express = require('express');
const router  = express.Router();
const User = require('../models/User')
const uploadCloud = require('../config/cloudinary.js');


/* GET users page */

  router.get('/profiles', (req, res, next) => {
    User.find()
      .then((listOfUsers)=>{

        res.render('userViews/index',{theList: listOfUsers})
  })
  .catch((err)=>{
    next(err);
  })

});



router.get('/profiles/new', (req, res, next)=>{
  res.render('userViews/create');

})


router.post('/profiles/create', uploadCloud.single('photo'), (req, res, next)=>{

  // const imgPath = req.file.url;
  // const imgName = req.file.originalname;

  User.create({
      name: req.body.name,
      imgPath: req.file.url,
      description: req.body.description,
      price: req.body.price,
      // imgName: req.file.originalname
  })
  .then((response)=>{
      res.redirect('/profiles')
  })
  .catch((err)=>{
      next(err);
  })

});





router.post('/profiles/delete/:id', (req, res, next)=>{


  User.findByIdAndRemove(req.params.id)
  .then((response)=>{
    res.redirect('/profiles')
  })
  .catch((err)=>{
    next(err)
  })
})

router.get('/profiles/edit/:userID', (req, res, next)=>{
  User.findById(req.params.userID)
  .then((theUser)=>{
    res.render('userViews/edit', {user: theUser })
  })

  .catch((err)=>{
    next(err);
  })

})

// username: String,
// password: String,
// email: String,
// firstname: String,
// lastname: String,
// address: String,
router.post('/profiles/edit/:userID', (req, res, next)=>{
  
  User.findByIdAndUpdate(req.params.userID, {
    username: req.body.username,
    email: req.body.email,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    address: req.body.address,
    // imgName: req.file.originalname
  })
  .then((response)=>{
    // res.redirect('/profiles/'+req.params.userID)
    res.redirect('/profiles')
  })
  .catch((err)=>{
    next(err)
  })


})


router.get('/profiles/:theid', (req, res, next)=>{

  User.findById(req.params.theid)
  .then((theUser)=>{
    res.render('userViews/show', {user: theUser})
  })
  .catch((err)=>{
     next(err);
  })

})


// router.get('/fancypage', (req, res, next)=>{
//   res.render('userViews/fancy.hbs')
// })


router.get('/api/profiles', (req, res, next) => {
  User.find()
    .then((listOfUsers)=>{
      res.json(listOfUsers)

})
.catch((err)=>{
  res.json(err);
})

});


module.exports = router;
