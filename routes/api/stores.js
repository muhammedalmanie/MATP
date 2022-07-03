const { application } = require('express');
var express = require('express');
const app = require('../../app');
var router = express.Router();
let Store = require('../../models/stores');


// Home Route
router.get('/list', function (req, res) {
  Store.find({}, function (err, stores) {
    if (err) {
      res.json({
        error: true
      });
    } else {
      res.json(stores);
    }
  });
});


// Add submit POST Route
router.post('/add', function (req, res, next) {
  console.log(req)
  let store = new Store({
    name: req.body.name,
    location: req.body.location
  });


  store.save(function (err) {
    if (err) {
      res.json({error:err, success: false, message:"not saved"});
      return;
    } else {
      res.json({success: true, id: store.id});
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

