const express = require('express');
const router  = express.Router();
const Item = require('../models/Item')
const uploadCloud = require('../config/cloudinary.js');


/* GET Items page */

  router.get('/items', (req, res, next) => {
    Item.find()
      .then((listOfItems)=>{

        res.render('itemViews/index',{theList: listOfItems})
  })
  .catch((err)=>{
    next(err);
  })

});



router.get('/items/new', (req, res, next)=>{
  res.render('itemViews/create');

})


router.post('/items/create', uploadCloud.single('photo'), (req, res, next)=>{

  // const imgPath = req.file.url;
  // const imgName = req.file.originalname;

  Item.create({
      name: req.body.name,
      imgPath: req.file.url,
      description: req.body.description,
      price: req.body.price,
      // imgName: req.file.originalname
  })
  .then((response)=>{
      res.redirect('/items')
  })
  .catch((err)=>{
      next(err);
  })

});





router.post('/items/delete/:id', (req, res, next)=>{


  Item.findByIdAndRemove(req.params.id)
  .then((response)=>{
    res.redirect('/items')
  })
  .catch((err)=>{
    next(err)
  })
})

router.get('/items/edit/:itemID', (req, res, next)=>{
  Item.findById(req.params.itemID)
  .then((theItem)=>{
    res.render('itemViews/edit', {theItem: theItem })
  })

  .catch((err)=>{
    next(err);
  })

})

// console.log(item.updated_at)

router.post('/items/update/:itemID', uploadCloud.single('photo'), (req, res, next)=>{
  Item.findByIdAndUpdate(req.params.itemID, {
    name: req.body.name,
    imgPath: req.file.url,
    description: req.body.description,
    price: req.body.price,
    // imgName: req.file.originalname
  })
  .then((response)=>{
    res.redirect('/items/'+req.params.itemID)
  })
  .catch((err)=>{
    next(err)
  })


})


router.get('/items/:theid', (req, res, next)=>{

  Item.findById(req.params.theid)
  .then((theItem)=>{
    res.render('itemViews/show', {item: theItem})
  })
  .catch((err)=>{
     next(err);
  })

})


// router.get('/fancypage', (req, res, next)=>{
//   res.render('itemViews/fancy.hbs')
// })


router.get('/api/items', (req, res, next) => {
  Item.find()
    .then((listOfItems)=>{
      res.json(listOfItems)

})
.catch((err)=>{
  res.json(err);
})

});


module.exports = router;
