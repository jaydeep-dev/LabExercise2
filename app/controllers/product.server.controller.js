const { json } = require('express');
const ProductModel = require('../models/product.server.model');

exports.create = async function (req, res) {
    console.log('Creating product');
    const product = new ProductModel(req.body);
    try {
        await product.save(product);
        return res.status(200).json({ message: 'Successfully added product' });
    }
    catch (e) {
        return res.status(400).json({ error: 'Unable to save product!' });
    }
};

exports.list = async function (req, res) {
    if (req.query.nm !== undefined) {
        console.log('Getting product data with query');
        const result = await ProductModel.find({ name: req.query.nm });
        res.send(result);
    } else {
        console.log('Getting product data');
        const result = await ProductModel.find();
        res.send(result);
    }
};

exports.deleteAll = async function (req, res) {
    try {
        await ProductModel.deleteMany({});
        res.json({ message: 'Deleted all products' });
    } catch (err) {
        return res.status(500).json({ error: 'Couldn\'t delete all product' });
    }
};

exports.productById = async function (req, res, next, id) {
    console.log('Getting product data by id');
    try {
        let product = await ProductModel.findById(id);
        if (!product) {
            return res.status(400).json({ error: 'Product not found!' });
        }
        req.profile = product;
        next();
    }
    catch (e) {
        return res.status(400).json({ error: 'Could not retrive product!' });
    }
};

exports.read = async function (req, res) {
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    return res.json(req.profile);
};

exports.update = async function (req, res) {
    console.log('Updating product data');
    try {
        let product = req.profile;
        product = await ProductModel.replaceOne({ _id: product._id }, req.body);
        product.hashed_password = undefined;
        product.salt = undefined;
        res.json(product);
    } catch (err) {
        return res.status(500).json({ error: 'couldn\'t update product' });
    }
};

exports.delete = async function (req, res) {
    try {
        let product = req.profile;
        let deletedUser = await ProductModel.deleteOne({ _id: product._id });
        deletedUser.hashed_password = undefined;
        deletedUser.salt = undefined;
        res.json(deletedUser);
    } catch (err) {
        return res.status(500).json({ error: 'Couldn\'t delete product' });
    }
};