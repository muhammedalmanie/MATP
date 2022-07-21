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
    UserList.findById(req.params.id, function (err, userList) {
    res.json({success: true,
        userList: userList
    });
  });
});

// Update submit POST Route
router.post('/edit/:id', function (req, res) {

  let userList = {};
  userList.name = req.body.name;

  let query = { _id: req.params.id }

  UserList.updateOne(query, userList, function (err) {
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

  UserList.remove(query, function (err) {
    if (err) {
      res.render('error');
      return;
    }
    res.redirect('/');
  });
});


module.exports = router;

