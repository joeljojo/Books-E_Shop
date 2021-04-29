const mongoose = require('mongoose');

const RequestSchema = new mongoose.Schema({
    name: String,
    email: String,
    bookname: String,
    date: Date
});
module.exports = mongoose.model("Request", RequestSchema);