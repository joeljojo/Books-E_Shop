const express = require('express');
const passport = require('passport');

const router = express.Router();

//Login
router.get('/', (req, res) => {
    res.render('login');
});

router.post('/', (req, res, next) => {

        passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/login',
            failureFlash: true
        }), (req, res, next);
    }


);
module.exports = router;












module.exports = router;