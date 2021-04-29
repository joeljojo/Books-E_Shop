const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const session = require('express-session');
const ejs = require('ejs');
const flash = require('connect-flash');
const passport = require('passport');
const path = require('path');
const bodyParser = require('body-parser');
const assert = require('assert').strict;


//Import  modules
const database = require("./database");
const adminRoutes = require('./api/admin/admin');
const registerRoutes = require('./api/users/register');
const loginRoutes = require('./api/users/login');
const addProductsRoutes = require('./api/products/addproducts');
const RequestBookRoutes = require('./api/products/requestbook');
const Product = require('./models/products');
const Register = require('./models/User');
const Request = require('./api/products/requestbook');



//const { assert } = require('console');
//const strategy = require('./config/passport');
const app = express();

//Passport config
require('./config/passport')(passport);
//const port = 5500

app.set('view engine', 'ejs');
//app.use(express.session({ secret: 'keyboard cat' }))
app.use(session({
    cookie: { maxAge: 60000 },
    secret: 'woot',
    resave: true,
    saveUninitialized: true
}));
//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//Global variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
})
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    // let product_list = [{ name: 'Trouser', category: 'men', desc: 'Good one', quantity: '10', price: 1000 }];
    Product.find({}).exec((err, product_list) => {
        // assert.equal(err, null);
        res.render('index', { products: product_list });
    })

});
app.get('/products', (req, res) => {
    Product.find({})
        .exec((err, products) => {
            if (err) {
                console.log(err);
            } else {
                res.json(products);
            }
            console.log(products);
        })


})
app.get('/item', (req, res) => {

    // Product.find({}).exec((err, product_list) => {
    // assert.equal(err, null);
    res.render('item');
});




//Use Application-Level Middleware or Routes
app.use('/admin', adminRoutes);
app.use('/register', registerRoutes);
app.use('/login', loginRoutes);
app.use('/addproducts', addProductsRoutes);
app.use('/requestbook', RequestBookRoutes);
app.use("/static", express.static('public'));
module.exports = app;