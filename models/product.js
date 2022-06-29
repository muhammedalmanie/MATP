
//Schema
/*
var { default: mongoose } = require("mongoose")
var productSchema = new mongoose.schema({
    name: {
      type: String,
      required: true
    },
  
    price: {
      type: String,
      required: true
    }
  })
  module.exports = mongoose.model('product', productSchema)
  */

  let mongoose = require('mongoose');

  //Product Schema
  let productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true

    },

    price: {
        type: String,
        required: true
    }
  });

  let Product = module.exports = mongoose.model('Product', productSchema);

