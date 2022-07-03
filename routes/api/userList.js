const { application } = require('express');
var express = require('express');
const app = require('../../app');
var router = express.Router();
let UserList = require('../../models/userList');


// Home Route
router.get('/list', function (req, res) {
    UserList.find({}, function (err, user) {
    if (err) {
      res.json({
        error: true
      });
    } else {
      res.json(user);
    }
  });
});




// Add submit POST Route
router.post('/add', function (req, res, next) {
  console.log(req)
  let user1 = new UserList({
    name: req.body.name,
    
  });


  user1.save(function (err) {
    if (err) {
      res.json({error:err, success: false, message:"not saved"});
      return;
    } else {
      res.json({success: true, id: user.id});
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

