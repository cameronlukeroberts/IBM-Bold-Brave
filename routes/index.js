var express = require('express');
var router = express.Router();

var api = require('../api');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Dashboard' });
});

/* GET profile page. */
router.get('/profile', function(req, res, next) {
  api.get_user(req.params.usr).then(function(resp){
    console.log(resp);
    console.log("-----------");
    var name=resp[0].name;
    console.log(name);
    res.render('profile', { title: 'Profile' });
  }).catch(function(err){
    res.send(err);
  });
});

/* GET help page. */
router.get('/help', function(req, res, next) {
  res.render('help', { title: 'Help' });
});

/* GET test page. */
router.get('/test', function(req, res, next) {
  res.render('test', { title: 'Brave&Bold Test' });
});

/* GET activity page. */
router.get('/activity/:lev/:mod', function(req, res, next) {
  res.render('activity', { title: 'Activities', level:req.params.lev, module:req.params.mod});
});

module.exports = router;
