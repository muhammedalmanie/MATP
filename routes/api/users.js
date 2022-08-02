const { application } = require('express');
var express = require('express');
const app = require('../../app');
var router = express.Router();
let User = require('../../models/user');
let UserList = require('../../models/userList');


// Home Route
router.get('/list', function (req, res) {
    User.find({}, function (err, user) {
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
    let user1 = new User({
        name: req.body.name,
        userLists: []
    });
    let userList1 = new UserList({
        name: "default",
        products: []
    })
    userList1.save();
    user1.userLists.push(userList1)
    user1.save(function (err) {
        if (err) {
            res.json({ error: err, success: false, message: "not saved" });
            return;
        } else {
            res.json({ success: true, id: user1.id });
        }
    });
});


// Update route
router.get('/edit/:id', function (req, res) {
    User.findById(req.params.id, function (err, user) {
        res.render('update', {
            user: user
        });
    });
});

// Update submit POST Route
router.post('/edit/:id', function (req, res) {

    let user = {};
    user.name = req.body.name;

    let query = { _id: req.params.id }

    User.updateOne(query, user, function (err) {
        if (err) {
            res.render('error');
            return;
        } else {
            res.redirect('/');
        }
    });
});




module.exports = router;

