const { application } = require('express');
var express = require('express');
var router = express.Router();
//var product = require('../models/product')
let Product = require('../../models/product');


// Home Route
router.get('/', function (req, res) {
  Product.find().populate('productPrices.store').exec({}, function (err, products) {
    if (err) {
      res.json({
        success: false,
        error: err
      });
    } else {
      res.json( {
        success: true,
        products: products
      });
    }
  });
});

// Get single product
router.get('/view/:id',keycloak.protect('user'), function (req, res) {
  console.log(req)
  Product.findById(req.params.id, function (err, product) {

    if (err) {
      res.json({
        error: true
      });
    } else {
      res.json(product);
    }

  });
});


// Add Route
router.get('/add', function (req, res) {
  res.json('products/add', {
  });
});

// Add submit POST Route
router.post('/add', function (req, res, next) {
  let product = new Product({
    name: req.body.name,
    price: req.body.price,
    barcode: req.body.barcode,
    storeID: req.body.storeID,
    description: req.body.description,

  });


  product.save(function (err) {
    if (err) {
      res.json({
        error: true,
        message:err.message
      });
    } else {
      res.json({error: false});
    }
  });
});


// Update route
router.get('/edit/', function (req, res) {
  Product.findById(req.params.id, function (err, product) {
    res.json('update', {
      product: product
    });
  });
});

// Update submit POST Route
router.post('/edit/', function (req, res) {

  let product = {};
  product.name = req.body.name;
  product.price = req.body.price;
  product.barcode = req.body.barcode,
  product.storeID = req.body.storeID,
  product.description = req.body.description,

  query = { _id: req.query.id }

  Product.updateOne(query, product, function (err) {
    console.log(err);
    if (err) {
      res.json({
        error: true
      });
    } else {
      res.json({
        error: false
      });
    }
  });
});




// Delete Route
router.delete('/', function (req, res) {
  let query = { _id: req.query.id }
  console.log(req);
  Product.deleteOne(query, function (err,rest) {
    console.log(err,rest);
    if (err) {
      res.json({
        error: true
      });
    } else {
      res.json({
        error: false
      });
    }
  });
});


module.exports = router;

