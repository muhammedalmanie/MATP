

  let mongoose = require('mongoose');

  const priceSchema= mongoose.Schema({
    store: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Store"
    },
    productPrice: {
        type: Number,
        required: true
    },

    priceDate: {
        type: Date,
        required: false,
        default: Date.now()
    },

    productAvailability: {
        type: Boolean,
        required: false
    }

  });
  //Product Schema
  let productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true

    },

    productPrices: [ priceSchema ],

    barcode: {
        type: Number,
        required: true
    },

    image:{
        type: Buffer,
    required: false
    },

    description: {
        type: String,
        required: true
    }


  });





  let Product = module.exports = mongoose.model('Product', productSchema);

