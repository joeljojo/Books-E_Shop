const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const upload = require('express-fileupload');



const Product = require('../../models/products');
const bodyParser = require('body-parser');
const User = require('../../models/User');



//Set storage Engine
const router = express.Router();

router.use(upload());



router.get('/', (req, res, next) => {
    res.render('addproducts');
});

router.post('/', (req, res) => {
    if (req.files) {
        console.log(req.files);
        const file = req.files.productImage;
        const filename = file.name;
        console.log(filename);
        //Move file to Uploads
        file.mv('./public/uploads/' + filename, (err) => {
            if (err) {
                res.send(err);
            } else {
                res.send('Book Added Successfully');


            }
        })
        const product = new Product({
            name: req.body.productName,
            desc: req.body.productDesc,
            quantity: req.body.productQty,
            price: req.body.productPrice,
            image: filename,
            date: Date.now()
        });
        product.save().then(() => {
            res.send("Product Added Successfully");
        });
    }







});


module.exports = router;