//Require the correct packages
var express = require('express');
var router = express.Router();

var api=require('../api');

// user
router.get('/user/:usr', function(req, res, next) {
  api.get_user(req.params.usr).then(function(resp){
    res.json(resp);
  }).catch(function(err){
    res.send(err);
  });
});

// levels
router.get('/levels', function(req, res, next){
  api.get_levels().then(function(resp){
    res.json(resp);
  }).catch(function(err){
    res.send(err);
  });
});

// FAQ
router.get('/faq', function(req, res, next){
  api.get_faq().then(function(resp){
    res.json(resp);
  }).catch(function(err){
    res.send(err);
  });
});

//bravetst questions
router.get('/btq', function(req, res, next){
  api.get_btq().then(function(resp){
    res.json(resp);
  }).catch(function(err){
    res.send(err);
  });
});

// Activities in modules
router.get('/levels/:lev/:mod', function(req, res, next){
  api.get_activity(req.params.lev, req.params.mod).then(function(resp){
    res.json(resp);
  }).catch(function(err){
    res.send(err);
  });
});

// Leaderboard
router.get('/leaderboard', function(req, res, next){
  api.get_leaderboard().then(function(resp){
    res.json(resp);
  }).catch(function(err){
    res.send(err);
  });
});

// Add score
router.get('/addscore/:user/:score', function(req, res, next){
  api.add_score(req.params.user, parseInt(req.params.score, 10)).then(function(resp){
    res.send('Score added successfully');
  }).catch(function(err){
    res.send(err);
  });
});

// Add activity
router.get('/addactivity/:user/:lev/:mod/:act/:newscore', function(req, res, next){
  api.add_activity(req.params.user,
                    parseInt(req.params.lev, 10),
                    parseInt(req.params.mod, 10),
                    parseInt(req.params.act, 10),
                    parseInt(req.params.newscore)).then(function(resp){
    res.send('Score added successfully');
  }).catch(function(err){
    res.send(err);
  });
});

// Set points
router.get('/setpoints/:user/:score', function(req, res, next){
  api.set_points(req.params.user, parseInt(req.params.score)).then(function(resp){
    res.send('Points set successfully');
  }).catch(function(err){
    res.send(err);
  });
});




router.get('/gottahashallthestuff/:u', function(req, res, next){
  api.hash_passwords(req.params.u);
});



module.exports = router;
