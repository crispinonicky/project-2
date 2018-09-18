

const express = require('express');
const router  = express.Router();
const Review = require('../models/Review')
const uploadCloud = require('../config/cloudinary.js');


/* GET Reviews page */

  router.get('/reviews', (req, res, next) => {
    Review.find()
      .then((listOfReviews)=>{

        res.render('reviewViews/index',{theList: listOfReviews})
  })
  .catch((err)=>{
    next(err);
  })

});



router.get('/reviews/new', (req, res, next)=>{
  res.render('reviewViews/create');

})


router.post('/reviews/create', uploadCloud.single('photo'), (req, res, next)=>{

  // const imgPath = req.file.url;
  // const imgName = req.file.originalname;

  Review.create({
      commenter: req.body.commenter,
      title: req.body.title,
      review: req.body.review,
      rating: req.body.rating,
      // imgName: req.file.originalname
  })
  .then((response)=>{
      res.redirect('/reviews')
  })
  .catch((err)=>{
      next(err);
  })

});





router.post('/reviews/delete/:id', (req, res, next)=>{


  Review.findByIdAndRemove(req.params.id)
  .then((response)=>{
    res.redirect('/reviews')
  })
  .catch((err)=>{
    next(err)
  })
})

router.get('/reviews/edit/:reviewID', (req, res, next)=>{
  Review.findById(req.params.reviewID)
  .then((theReview)=>{
    res.render('reviewViews/edit', {theReview: theReview })
  })

  .catch((err)=>{
    next(err);
  })

})

// console.log(Review.updated_at)

router.post('/reviews/update/:reviewID', uploadCloud.single('photo'), (req, res, next)=>{
  Review.findByIdAndUpdate(req.params.reviewID, {
    commenter: req.body.commenter,
    title: req.body.title,
    review: req.body.review,
    rating: req.body.rating,
    // imgName: req.file.originalname
  })
  .then((response)=>{
    res.redirect('/reviews/'+req.params.reviewID)
  })
  .catch((err)=>{
    next(err)
  })


})


router.get('/reviews/:theid', (req, res, next)=>{

  Review.findById(req.params.theid)
  .then((theReview)=>{
    res.render('reviewViews/show', {review: theReview})
  })
  .catch((err)=>{
     next(err);
  })

})


// router.get('/fancypage', (req, res, next)=>{
//   res.render('reviewViews/fancy.hbs')
// })


router.get('/api/reviews', (req, res, next) => {
  Review.find()
    .then((listOfReviews)=>{
      res.json(listOfReviews)

})
.catch((err)=>{
  res.json(err);
})

});


module.exports = router;
