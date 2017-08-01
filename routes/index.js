var express = require('express');
var router = express.Router();

var api = require('../api');

var passport = require('passport');

var isAuthenticated = function (req, res, next) {
  console.log(req.user);
  if (req.isAuthenticated())
    return next();
  res.redirect('/login');
}

var isAuthenticatedLogin = function (req, res, next) {
  if (!req.isAuthenticated())
    return next();
  res.redirect('/');
}
/* GET home page. */
router.get('/', isAuthenticated, function(req, res, next) {
  console.log(req.user);
  res.render('index', { title: 'Dashboard', user: req.user });
});

/* GET login page. */
router.get('/login', isAuthenticatedLogin, function(req, res, next) {
  res.render('login', { title: 'Login' });
});

/* GET profile page. */
router.get('/profile', function(req, res, next) {
  res.render('profile', { title: 'Profile', user: req.user });
});

/* GET help page. */
router.get('/help', function(req, res, next) {
  res.render('help', { title: 'Help', user: req.user });
});

/* GET test page. */
router.get('/test', function(req, res, next) {
  res.render('test', { title: 'Brave&Bold Test', user: req.user });
});

/* GET test_start page. */
router.get('/test_start', function(req, res, next) {
  res.render('test_start', { title: 'Brave&Bold Test', user: req.user });
});


/* GET test_end page. */
router.get('/test_end', function(req, res, next) {
  res.render('test_end', { title: 'Brave&Bold Test', user: req.user });
});


/* GET activity page. */
router.get('/activity/:lev/:mod', function(req, res, next) {
  res.render('activity', { title: 'Activities', level:req.params.lev, module:req.params.mod, user: req.user });
});

/* authentication */


router.post('/login', passport.authenticate('login', {
    successRedirect: '/',
    failureRedirect: '/login'
    }
));



router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/login');
});

router.get('/ping', function(req, res){
    res.status(200).send("pong!");
});


module.exports = router;
