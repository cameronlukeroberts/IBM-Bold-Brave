//Require the correct packages
var express = require('express');
var router = express.Router();

var api=require('../api');

/* GET user. */
router.get('/user/:usr', function(req, res, next) {
  var j=api.get_user(req.params.usr).then(function(resp){
    console.log(resp);
    res.json(resp);
  }).catch(function(err){
    res.send(err);
  });
});

module.exports = router;
