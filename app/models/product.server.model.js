const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductScheme = new Schema({
    name: String,
    description: String,
    price: Number,
    quantity: Number,
    category: String
});

module.exports = mongoose.model('product', ProductScheme);