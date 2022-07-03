let mongoose = require('mongoose');

//User Schema
let userSchema = mongoose.Schema({
  name: {
      type: String,
      required: true
  },

  userLists: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserList"
}],
});

let User = module.exports = mongoose.model('User', userSchema);

