//Include the config file for DB information
var config = require('./config');

var Cloudant = require('cloudant');

//Set up variables with database config information
var user = config.db.username;
var password = config.db.password;
var host = config.db.host;

//Create the cloudant object
var cloudant = Cloudant("https://" + user + ":" + password + "@" + host);

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

module.exports={
  get_user
}
