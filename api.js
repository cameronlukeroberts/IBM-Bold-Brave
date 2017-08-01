//Include the config file for DB information
var config = require('./config');

var Cloudant = require('cloudant');

//Set up variables with database config information
var user = config.db.username;
var password = config.db.password;
var host = config.db.host;

//Create the cloudant object
var cloudant = Cloudant("https://" + user + ":" + password + "@" + host);

// Bcrypt instance
var bcrypt = require('bcrypt');

function get_user(usr){
  return new Promise(function(resolve, reject){
    var db = cloudant.db.use('bb_users');
    db.find({selector:{username:usr}}, function(er, result) {
      if (er) {
        reject(er);
      }
      resolve(result.docs);
    });
  });
}

function get_levels(){
  return new Promise(function(resolve, reject){
    var db = cloudant.db.use('bb_levels');
    db.find({selector:{_id:{"$gt":0}}}, function(er, result) {
      if (er) {
        reject(er);
      }
      resolve(result.docs);
    });
  });
}

function get_faq(){
  return new Promise(function(resolve, reject){
    var db = cloudant.db.use('bb_faq');
    db.find({selector:{_id:{"$gt":0}}}, function(er, result) {
      if (er) {
        reject(er);
      }
      resolve(result.docs);
    });
  });
}

function get_btq(){
  return new Promise(function(resolve, reject){
    var db = cloudant.db.use('bb_questions');
    db.find({selector:{_id:{"$gt":0}}}, function(er, result) {
      if (er) {
        reject(er);
      }
      resolve(result.docs);
    });
  });
}

function get_activity(level, mod){
  return new Promise(function(resolve, reject){
    var db = cloudant.db.use('bb_levels');
    db.find({selector:{lvl_id:{"$eq":0}}}, function(er, result) {
      if (er) {
        reject(er);
      }
      var lev=result.docs[0].modules;
      for(var i=0;i<lev.length;i++)
        if(lev[i].mod_id==mod) {resolve(lev[i].activities); break;}
    });
  });
}

function get_leaderboard(){
  return new Promise(function(resolve, reject){
    var db = cloudant.db.use('bb_users');
    db.find({
        "selector":{
          "_id":{"$gt":0}
        },
        "fields":["points", "name", "img"]
      }, function(er, result) {
      if (er) {
        reject(er);
      }
      result=result.docs;
      result.sort(function(a, b){
        return b.points-a.points;
      });
      result.slice(0, 10);
      resolve(result);
    });
  });
}

function add_score(user, score){
  return new Promise(function(resolve, reject){
    var db = cloudant.db.use('bb_users');
    db.find({
        "selector":{
          "username": user
        }
      }, function(er, result) {
        if (er) {
          reject(er);
        }
        result=result.docs[0];
        var now=new Date();
        var day=now.getDate();
        var month=now.getMonth()+1;
        var year=now.getFullYear();
        var string=(day<10?'0':'')+day+'-'+(month<10?'0':'')+month+'-'+(year%100);
        result.res_bravetest.push({
          date: string,
          score: score
        });
        db.insert(result, function(err, body){
          if(!err){
            resolve("UPDATE OK");
          }
        })
    });
  });
}

// Add activity
function add_activity(user, lev, mod, act, score){
  return new Promise(function(resolve, reject){
    var db = cloudant.db.use('bb_users');
    db.find({
        "selector":{
          "username": user
        }
      }, function(er, result) {
        if (er) {
          reject(er);
        }
        result=result.docs[0];
        result.completed.push({
          lvl_id: lev,
          mod_id: mod,
          act_id: act
        });
        result.points=score;
        db.insert(result, function(err, body){
          if(!err){
            resolve("UPDATE OK");
          }
        })
    });
  });
}

// Set user points
function set_points(user, score){
  return new Promise(function(resolve, reject){
    var db = cloudant.db.use('bb_users');
    db.find({
        "selector":{
          "username": user
        }
      }, function(er, result) {
        if (er) {
          reject(er);
        }
        result=result.docs[0];
        result.points=score;
        db.insert(result, function(err, body){
          if(!err){
            resolve("UPDATE OK");
          }
        })
    });
  });
}

// Get password
function register_user(user, name, pwd, pwd_confirm, img){
  return new Promise(function(resolve, reject){
    var db = cloudant.db.use('bb_users');
    db.find({
        "selector":{
          "username": user
        }
      }, function(er, result) {
        if (er) {
          reject(er);
        }
        result=result.docs[0];
        result.points=score;
        //db.insert(result, function(err, body){
          if(!err){
            resolve("UPDATE OK");
          }
        })
    });
  });
}

module.exports={
  get_user,
  get_levels,
  get_faq,
  get_btq,
  get_activity,
  get_leaderboard,
  add_activity,
  add_score,
  set_points
}
