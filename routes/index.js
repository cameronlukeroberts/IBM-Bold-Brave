var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Dashboard' });
});

/* GET profile page. */
router.get('/profile', function(req, res, next) {
  res.render('profile', { title: 'Profile' });
});

/* GET help page. */
router.get('/help', function(req, res, next) {
  res.render('help', { title: 'Help' });
});

/* GET test page. */
router.get('/test', function(req, res, next) {
  res.render('test', { title: 'Brave&Bold Test' });

/* GET activity page. */
router.get('/activity', function(req, res, next) {
  res.render('activity', { title: 'Activity' });
});

module.exports = router;
