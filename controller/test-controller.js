var express = require('express');
var router = express.Router();

const keycloak = require('../config/keycloak-config').getKeycloak();

router.get('/anonymous', function(req, res){
    res.send("Hello Anonymous");
});

router.get('/user', keycloak.protect(), function(req, res){
    const token = req.kauth.grant.access_token.content;
console.log(req)
console.log(token)
    res.send("Hello User");

});

router.get('/admin', keycloak.protect('admin'), function(req, res){
    res.send("Hello Admin");
});

router.get('/all-user', keycloak.protect(['user','admin'], {response_mode: 'token'}), function(req, res){
    res.send("Hello All User");
});

module.exports = router;