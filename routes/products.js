const { application } = require('express');
var express = require('express');
var router = express.Router();
var product = require('../models/product')


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/add', function(req, res, next) {
  try {
      var products = await product.find() //isn't this the same as rendering?
      //res.json(products)
  }catch(err){
      res.send('Error ' + err)
  }
  res.render('products/add', { title: 'Express' });
});


router.get('/add/;id', function(req, res, next) {
  try {
      var product = await product.findById(req.params.id) 
      //res.json(product)
  }catch(err){
      res.send('Error ' + err)
  }
  res.render('products/add', { title: 'Express' });
});


router.post('/add', function(req, res, next) {
    var Product = new product({
      name: req.body.name,
      price: req.body.price,
    })
    try{
      var p1 = await Product.save()
      //res.json(p1)
    }catch(err){
      res.send('Error')
    }
  res.redirect('/products', { title: 'Express' });
});



router.patch('/update/:id', function(req, res, next) {
  try{
    var Product = await product.findById(req.params.id)
    Product.sub = req.body.sub
    var p1 = await Product.save()
    res.json(p1)
  }catch(err){
    res.send('Error')
  }
  res.render('products/update', { title: 'Express' });
});



/* router.post('/update', function(req, res, next) {
  //
  res.redirect('/products', { title: 'Express' });
}); */



router.delete('/delete', function(req, res, next) {
  try{
    var Product = await product.findById(req.params.id)
    Product.sub = req.body.sub
    var p1 = await Product.remove()
    res.json(p1)
  }catch(err){
    res.send('Error')
  }
  res.redirect('/products', { title: 'Express' });
});


module.exports = router;