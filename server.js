const myExpress = require("./config/express");
const myMongoose = require('./config/mongoose');
const productsRoute = require('./app/routes/product.server.routes');

require('dotenv').config();
const PORT = process.env.PORT || 5000;

async function Start() {
    await myMongoose(); // Connect first to database before starting Server
    
    const app = myExpress();
    app.listen(PORT);
    
    const express = require('express');
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.get('/', (req, res, next) => {
        res.send("{\"message\": \"Welcome to Dress store application.\"}");
        next();
    });
    app.use('/api/products', productsRoute);
    console.log("Server started on localhost:3000");
    module.exports = app;
}

Start();
