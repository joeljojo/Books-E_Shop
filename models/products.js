const express = require('express');
const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: String,
    brand: String,
    category: String,
    desc: String,
    quantity: Number,
    price: Number,
    image: String,
    date: Date
});
module.exports = mongoose.model("Product", ProductSchema);