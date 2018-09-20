const express = require('express');
const router  = express.Router();
const Order = require('../models/Order')


/* GET orders page */

  router.get('/orders', (req, res, next) => {
    Order.find()
      .then((listOfOrders)=>{

        res.render('orderViews/index',{theList: listOfOrders})
  })
  .catch((err)=>{
    next(err);
  })

});





router.get('/orders/new', (req, res, next)=>{
  res.render('orderViews/create');

})


router.post('/orders/create', (req, res, next)=>{

  Order.create({
      name: req.body.name,
      occupation: req.body.occupation,
      catchphrase: req.body.catchphrase
  })
  .then((response)=>{
      res.redirect('/orders')
  })
  .catch((err)=>{
      next(err);
  })

});





// router.post('/orders/delete/:id', (req, res, next)=>{


//   Order.findByIdAndRemove(req.params.id)
//   .then((response)=>{
//     res.redirect('/orders')
//   })
//   .catch((err)=>{
//     next(err)
//   })
// })

router.get('/orders/edit/:orderID', (req, res, next)=>{
  Order.findById(req.params.orderID)
  .then((theOrder)=>{
    res.render('orderViews/edit', {theOrder: theOrder })
  })

  .catch((err)=>{
    next(err);
  })

})

router.post('/orders/update/:orderID', (req, res, next)=>{
  Order.findByIdAndUpdate(req.params.orderID, {
    name: req.body.name,
    occupation: req.body.occupation,
    catchphrase: req.body.catchphrase
  })
  .then((response)=>{
    res.redirect('/orders/'+req.params.orderID)
  })
  .catch((err)=>{
    next(err)
  })


})


router.get('/orders/:theid', (req, res, next)=>{

  Order.findById(req.params.theid)
  .then((theCelebrity)=>{
    res.render('orderViews/show', {celeb: theOrder})
  })
  .catch((err)=>{
     next(err);
  })

})
  
module.exports = router;
