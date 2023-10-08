const config = require('./database');
const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

module.exports = async function() {
    const db = await mongoose.connect(config.db);

    require('../app/models/product.server.model');
    require('../app/models/category.server.model');

    console.log('Connected to database');
    return db;
}