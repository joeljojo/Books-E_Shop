const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const upload = require('express-fileupload');



//const Product = require('../../models/products');
const bodyParser = require('body-parser');
const User = require('../../models/User');
const Request = require('../../models/request');




//Set storage Engine
const router = express.Router();

router.use(upload());



router.get('/', (req, res, next) => {
    res.render('requestbook');
});

router.post('/', (req, res) => {
    const request = new Request({
        name: req.body.name,
        email: req.body.email,
        bookname: req.body.bookname,
        date: Date.now()
    });
    request.save().then(() => {
        res.send("Book Allocated Successfully");
    });





});


module.exports = router;