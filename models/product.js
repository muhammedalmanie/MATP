
//Schema

const { default: mongoose } = require("mongoose")

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