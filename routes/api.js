//Require the correct packages
var express = require('express');
var router = express.Router();

var api=require('../api');

// user
router.get('/user/:usr', function(req, res, next) {
  api.get_user(req.params.usr).then(function(resp){
    console.log(resp);
    res.json(resp);
  }).catch(function(err){
    console.log("AAAAA");
    res.send(err);
  });
});

// levels
router.get('/levels', function(req, res, next){
  api.get_levels().then(function(resp){
    console.log(resp);
    res.json(resp);
  }).catch(function(err){
    console.log("AAAAA");
    res.send(err);
  });
});

// FAQ
router.get('/faq', function(req, res, next){
  api.get_faq().then(function(resp){
    console.log(resp);
    res.json(resp);
  }).catch(function(err){
    console.log("AAAAA");
    res.send(err);
  });
});

module.exports = router;
