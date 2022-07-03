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
router.get('/view/:id', function (req, res) {
  console.log(req)
  Product.findById(req.params.id, function (err, product) {

    if (err) {
      console.log(err)
      res.render('error');
    } else {
      res.render('products/product', {
        product: product
      });
    }

  });
});


// Add Route
router.get('/add', function (req, res) {
  res.render('products/add', {
  });
});

// Add submit POST Route
router.post('/add', function (req, res, next) {
  let product = new Product({
    name: req.body.name,
    price: req.body.price
  });


  product.save(function (err) {
    if (err) {
      res.render('error', {error:err, message:"not saved"});
      return;
    } else {
      res.redirect('/');
    }
  });
});


// Update route
router.get('/edit/:id', function (req, res) {
  Product.findById(req.params.id, function (err, product) {
    res.render('update', {
      product: product
    });
  });
});

// Update submit POST Route
router.post('/edit/:id', function (req, res) {

  let product = {};
  product.name = req.body.name;
  product.price = req.body.price;

  let query = { _id: req.params.id }

  Product.updateOne(query, product, function (err) {
    if (err) {
      res.render('error');
      return;
    } else {
      res.redirect('/');
    }
  });
});



// Delete Route
router.delete('/:id', function (req, res) {
  let query = { _id: req.params.id }

  Product.remove(query, function (err) {
    if (err) {
      res.render('error');
      return;
    }
    res.redirect('/');
  });
});


module.exports = router;

