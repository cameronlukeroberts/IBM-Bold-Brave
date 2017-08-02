var express = require('express');
var router = express.Router();

var api = require('../api');

var passport = require('passport');

var multer = require('multer');
var bodyParser = require('body-parser');
/*
var config = require('./config');

var Cloudant = require('cloudant');

//Set up variables with database config information
var user = config.db.username;
var password = config.db.password;
var host = config.db.host;

//Create the cloudant object
var cloudant = Cloudant("https://" + user + ":" + password + "@" + host);
*/
var Storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, "./uploads");
    },
    filename: function(req, file, callback) {
        //callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
        var ext = require('path').extname(file.originalname);
        //var size = require('fs').stat(file.path).size;

        if(ext == '.png' || ext == '.jpg' || ext== '.jpeg'){
          /*
          var db = cloudant.db.use('bb_users');
          db.find({
              "selector":{
                "username": req.user
              }
            }, function(er, result) {
              if (er) {
                reject(er);
              }
              result=result.docs[0];
              result.img='/img/'+req.user+ext;
              db.insert(result, function(err, body){
                if(err){
                  callback("db", false);
                }
              })
          });
          */
          callback(null, ""+req.user+ext);
        }else
          callback("ext", false);

    }
});


var upload = multer({
    storage: Storage
}).array("image", 3); //Field name and max count


var isAuthenticated = function (req, res, next) {
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
  //console.log(req.user);
  res.render('index', { title: 'Dashboard', user: req.user });
});

/* GET profile page. */
router.get('/profile/:message', isAuthenticated, function(req, res, next) {
  console.log(req.params.message)
  res.render('profile', { title: 'Profile', user: req.user, message: req.params.message });
});

router.get('/profile', isAuthenticated, function(req, res, next) {
  res.render('profile', { title: 'Profile', user: req.user, message: "undefined" });
});

/* GET help page. */
router.get('/help', isAuthenticated, function(req, res, next) {
  res.render('help', { title: 'Help', user: req.user });
});

/* GET test page. */
router.get('/test', isAuthenticated, function(req, res, next) {
  res.render('test', { title: 'Brave&Bold Test', user: req.user });
});

/* GET test_start page. */
router.get('/test_start', isAuthenticated, function(req, res, next) {
  res.render('test_start', { title: 'Brave&Bold Test', user: req.user });
});


/* GET test_end page. */
router.get('/test_end', isAuthenticated, function(req, res, next) {
  res.render('test_end', { title: 'Brave&Bold Test', user: req.user });
});


/* GET activity page. */
router.get('/activity/:lev/:mod', isAuthenticated, function(req, res, next) {
  res.render('activity', { title: 'Activities', level:req.params.lev, module:req.params.mod, user: req.user });
});

/* GET login page. */
router.get('/login', isAuthenticatedLogin, function(req, res, next) {
  res.render('login', { title: 'Login' });
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

router.get('/register', isAuthenticatedLogin, function(req, res, next){
  res.render('register', {title: 'Register'});
});

router.post('/register', function(req, res, next){
  api.register_user(
    req.body.username,
    req.body.name,
    req.body.password,
    req.body.password_confirm,
    req.body.img).then(function(res){
      res.redirect('/login');
    }).catch(function(err){
      res.send('err');
    });
});

router.get('/ping', function(req, res){
    res.status(200).send("pong!");
});

router.post("/uploadImage", function(req, res) {
    upload(req, res, function(err) {
        console.log(err);
        if (err) {
            return res.redirect('/profile/'+err);
        }

        return res.redirect('/profile/success');
    });
});

router.get('/img/:img', isAuthenticatedLogin, function(req, res, next){
  res.sendFile('./uploads/'+req.params.img);
});

module.exports = router;
