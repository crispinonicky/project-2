
const express      = require('express');
const router       = express.Router();
const Celebrity    = require('../models/Celebrity');
const Item        = require('../models/Item');




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
        genre: req.body.genre,
        plot: req.body.plot,
        image: req.body.image,
        imgPath: req.body.imgPath,
        imgName: req.body.imgName,

    })
    .then((response)=>{
        res.json(response);
    })
    .catch((err)=>{
        res.json(err);
    })

});


module.exports = router;