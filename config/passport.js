const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const passport = require('passport');

//Load Model
const User = require('../models/User');

module.exports = (passport) => {
    // Local Strategy

    passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
        //Match user
        User.findOne({ email: email })
            .then(user => {
                if (!user) {
                    console.log("Incorrect Username")
                    return done(null, false, { message: "Incorrect Usernane or not registered" })
                }
                //Match password
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (err) throw err;
                    console.log("Password Do not match");
                    if (isMatch) {
                        console.log("Password Match");
                        return done(null, user);
                    } else {
                        return done(null, false, { message: "Incorrect Password" })
                    }
                })
            })
            .catch(err => console.log(err));
    }));
    //Serialize and deserialize user
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });
}