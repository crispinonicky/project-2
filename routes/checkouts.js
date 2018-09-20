const express = require('express');
const router  = express.Router();
const User = require('../models/User');
const Item = require('../models/Item');
const Order = require('../models/Order');

router.post('/orders/create', (req, res, next) => {
  const newOrder = new Order({
    customer: req.user._id,
    list: []
  })

  newOrder.list.push(req.body.item)
  
  newOrder.save()
  .then(() => {
    res.redirect('/items')
    window.alert("sometext");
  })
  .catch(err => next(err))
})


router.get('/checkout', (req,res,next) => {
  Order.find({customer: req.user._id}).populate('list')
  .then(ordersFromDb => {

    const prices = [];

    ordersFromDb.forEach(oneOrder => {
     oneOrder.list.forEach(oneItem => {
        prices.push(oneItem.price)
      })
    })

    const totalPrice = prices.reduce((a,b) => a+b).toFixed(2)

    console.log('= = == = ', totalPrice)

    const sortedOrders = ordersFromDb.sort()


    res.render("checkout", { orders: sortedOrders, total:totalPrice })
  })
  .catch(err => next(err))
})

module.exports = router;