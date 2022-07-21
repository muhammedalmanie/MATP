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
    res.json('update', {
      product: product
    });
  });
});




module.exports = router;

