//Authenticate Router
//Username and Password Login

//imports
jwt = require('jsonwebtoken');

var authenticator = {};

authenticator.authenticate = function(call, callback){
  callback(null,{username:"mwildadmin", email:"test@test.com"});
}


authenticator.getTokenContent = function(token, secret, callback){
  //check token schema
  if(token.indexOf('Bearer ') != -1){
    //using Bearer schema
    jwt.verify(token.substring( token.indexOf("Bearer ") + "Bearer ".length ), secret, callback);
  }
}

authenticator.getRawToken = function(token){
  if(token.indexOf('Bearer ') != -1){
    return token.substring( token.indexOf("Bearer ") + "Bearer ".length );
  }
}

module.exports = authenticator;
