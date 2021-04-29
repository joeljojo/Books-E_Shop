const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', (req, res, next) => {
    res.sendFile(path.resolve(__dirname + '../../../../admin.html'));
});
router.post('/', (req, res, next) => {

});

module.exports = router;