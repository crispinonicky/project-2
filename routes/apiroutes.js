
const express      = require('express');
const router       = express.Router();
const Order        = require('../models/Order');
const Item         = require('../models/Item');




router.get('/items', (req, res, next) => {
    Item.find()
    .then((listOfItems)=>{

        res.json(listOfItems)

    })
    .catch((err)=>{
        res.json(err);
    })
});



router.post('/items/create', (req, res, next)=>{

    Item.create({
        title: req.body.title,
        imgPath: req.body.imgPath,
        description: req.body.genre,
        price: req.body.plot,
    })
    .then((response)=>{
        res.json(response);
    })
    .catch((err)=>{
        res.json(err);
    })

});


module.exports = router;