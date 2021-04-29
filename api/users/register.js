const express = require('express');
const bodyParser = require('body-parser');
const User = require('../../models/User');
const path = require('path');
const bcrypt = require('bcrypt');
var { body, validationResult } = require('express-validator');
const passport = require('passport');
const router = express.Router();


router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', (req, res, next) => {
    res.render(path.resolve('./views/register'));
});
router.post('/', (req, res) => {
    const { firstName, secondName, phoneNumber, email, password, confirmPassword } = req.body;
    let errors = [];

    //Check the Empty or Required fields
    if (!firstName || !secondName || !phoneNumber || !email || !password || !confirmPassword) {
        errors.push({ msg: 'Please fill in empty fields' });
    }

    //Check passwords Match
    if (password !== confirmPassword) {
        errors.push({ msg: 'Passwords do not match' });
    }

    //Check Password Length
    if (password.length < 6) {
        errors.push({ msg: 'Password should be at least 6 characters' });
    }
    if (errors.length > 0) {
        res.render('register', {
            errors,
            firstName,
            secondName,
            phoneNumber,
            email,
            password,
            confirmPassword
        });
    } else {
        //Pass Validation
        User.findOne({ email: email })
            .then(user => {
                // Check if user exists
                if (user) {
                    //User exists
                    errors.push({ msg: 'Email is already registered' })
                    res.render('register', {
                        errors,
                        firstName,
                        secondName,
                        phoneNumber,
                        email,
                        password,
                        confirmPassword
                    });

                } else {
                    //Register
                    const newUser = new User({
                        firstName,
                        secondName,
                        phoneNumber,
                        email,
                        password
                    });
                    // Hash Password
                    bcrypt.genSalt(10, (err, salt) =>
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) throw err;
                            //Set Password to Hashed
                            newUser.password = hash;

                            //Save New User
                            newUser.save()
                                .then(user => {
                                    req.flash('success_msg', 'You are now registered and can log in');
                                    res.redirect('/login');
                                })
                                .catch(err => console.log(err));
                        }))
                    console.log(newUser);
                }
            });
    }


});




module.exports = router;