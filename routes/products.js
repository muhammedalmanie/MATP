const { application } = require('express');
var express = require('express');
var router = express.Router();
//var product = require('../models/product')
let Product = require('../models/product');


// Home Route
router.get('/', function(req, res){
    Product.find({}, function(err, products){
      if(err){
        res.render('error'); 
      } else {
      res.render('products/index', {
        title: 'Products',
        products: products
       });
      }
    });
});

// Get single product
router.get('/:id', function(req, res){
  Product.findById(req.params.id, function(err, product){
    res.render('product', {
      product:product
     });
  });
});


// Add Route
router.get('/add', function(req, res){
  res.render('products/add', {
    title: 'Add a Product'
  });
});

// Add submit POST Route
router.post('/add', function(req, res){
let Product = new product();
product.name = request.body.name;
product.price = request.body.price;

product.save(function(err){
  if(err){
    res.render('error');    
    return;
  } else {
    res.redirect('products/index');
    }
  });
});


// Update route
router.get('/edit/:id', function(req, res){
  Product.findById(req.params.id, function(err, product){
    res.render('update', {
      product:product
     });
  });
});

// Update submit POST Route
router.post('/edit/:id', function(req, res){

  let product = {};
  product.name = request.body.name;
  product.price = request.body.price;
  
  let query = {_id:req.params.id}

  Product.update(query, product, function(err){
    if(err){
      res.render('error');    
      return;
    } else {
      res.redirect('products/index');
      }
    });
  });
  



/*
/* GET home page. */
/*
router.get('/', function(req, res, next) {
  product.find({}, function(err, products)){

    res.render('index', { title: 'Express' });
  }
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


router.get('/add/:id', function(req, res, next) {
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

/*
router.delete('/delete', function(req, res, next) {
  try{
    var Product = await product.findById(req.params.id)
    Product.sub = req.body.sub
    var p1 = await Product.remove()
    //res.json(p1)
  }catch(err){
    res.send('Error')
  }
  res.redirect('/products', { title: 'Express' });
});
*/

module.exports = router;

