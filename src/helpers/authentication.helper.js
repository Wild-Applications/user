//Authenticate Router
//Username and Password Login

//imports
var authenticator = {};

authenticator.authenticate = function(call, callback){
  callback(null,{username:"mwildadmin", email:"test@test.com"});
}

module.exports = authenticator;
