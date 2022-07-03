let mongoose = require('mongoose');



//User List Schema
let userListSchema = mongoose.Schema({

  name: {
      type: String,
      required: true
  },

  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product"
}],
});

let UserList = module.exports = mongoose.model('UserList', userListSchema);

