var express = require('express');
var router = express.Router();

var api = require('../api');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Dashboard' });
});

/* GET login page. */
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login' });
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

/* GET test_start page. */
router.get('/test_start', function(req, res, next) {
  res.render('test_start', { title: 'Brave&Bold Test' });
});


/* GET test_end page. */
router.get('/test_end', function(req, res, next) {
  res.render('test_end', { title: 'Brave&Bold Test' });
});


/* GET activity page. */
router.get('/activity/:lev/:mod', function(req, res, next) {
  res.render('activity', { title: 'Activities', level:req.params.lev, module:req.params.mod});
});




/* authentication */

var passport = require('passport');

/*
router.post('/register', function(req, res) {
    Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
        if (err) {
            return res.render('register', { account : account });
        }

        passport.authenticate('singup')(req, res, function () {
            res.redirect('/');
        });
    });
});
*/


router.post('/login', passport.authenticate('login'), function(req, res) {
    res.redirect('/');
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

router.get('/ping', function(req, res){
    res.status(200).send("pong!");
});


module.exports = router;
