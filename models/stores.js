

  let mongoose = require('mongoose');

  //Store Schema
  let storeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    location: {
        type: String,
        required: true
    }
  });

  let Store = module.exports = mongoose.model('Store', storeSchema);

