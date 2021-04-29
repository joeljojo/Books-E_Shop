const express = require('express');
const mongoose = require('mongoose');
const database = express();

//Connect to Database(MongoDB Atlas)

const uri = "mongodb+srv://joeljojo:Pamphyl.ouma18@jojomall.xvbxo.mongodb.net/jojomall?retryWrites=true&w=majority";
mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("MongoDB Connected");
    })
    .catch(err => console.log(err));
module.exports = database;