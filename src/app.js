//Authentication Service
//Entry Point

//imports
var restify = require('restify'),
Logger = require('bunyan');

//
//
//Logging setup
//
//
var log = new Logger.createLogger({
  name:'MAIN',
  //define where to write each log
  streams:[
    {
      level:'info',
      path: __dirname + '/logs/info.log'
    },
    {
      level:'error',
      path: __dirname + '/logs/error.log'
    },
    {
      level:'fatal',
      path: __dirname + '/logs/error.log'
    },
    {
      level:'warn',
      path: __dirname + '/logs/error.log'
    },
    {
      level:'debug',
      stream: process.stdout
    },
    {
      level:'trace',
      path: __dirname + '/logs/trace.log'
    }
  ],
  //how to serialise messages
  serializers: {
    req: Logger.stdSerializers.req,
    res: Logger.stdSerializers.res,
  }
});


//
//
//Server Setup
//
//
var server = restify.createServer({
  name:'user',
  version:'0.0.1',
  //certificate:fs.readFileSync('../certificate'),
  //key:fs.readFileSync('../key')
  log:log
});

//use body parser to deal with JSON
server.use(restify.bodyParser());
server.use(restify.queryParser());

//
//
//Server routes
//
//
//version request
//return latest default version
server.get("/version", function(req,res,next){
  server.log.info("Version Request");
  res.send(server.name + " is running on v" + server.versions);
});


var grpc = require("grpc");
var authenticationDescriptor = grpc.load(__dirname + '/proto/user.proto').user;
var authenticationClient = new authenticationDescriptor.UserService('service.authentication:1295', grpc.credentials.createInsecure());


//
//
//Login Request
//
server.post("/login", function(req,res,next){
  //check if a username and password have been supplied
  if( req.body && req.body.username && req.body.password ){
    authenticationClient.authenticateUser(req.body, function(err, response){
      if(err)
      {
        server.log.error(err);
        res.status(401);
        res.send(err);
      }else{
        res.send(response);
      }
    });
  }else{
    var error = {message:'Username or Password was not supplied', code: '0006'};
    res.status(400);
    server.log.error(error);
    res.send(error);
  }
});

//
//
//Create user request
//
server.post("/", function(req,res,next){
  res.send("Create user - Not Implemented");
  if( req.body.username
    && req.body.password
    && req.body.email ){
      var userToCreate = {};
      userToCreate.username = req.body.username;
      userToCreate.password = req.body.password;
      userToCreate.email = req.body.email;

    authenticationClient.createUser(userToCreate, function(err, response){
      if(err){
        server.log.error(err);
      }else{
        res.send(response);
      }
    });
  }else{
    var error = {message:'Not all parameters were supplied', code: '0007'};
    res.status = 400;
    server.log.error(error);
    res.send(error);
  }
});


//
//
//Delete user request
//
server.del("/:_id", function(req,res,next){
  res.send("Delete User - Not Implemented");
});

//
//
//Update User
//
server.put("/:_id", function(req,res,next){
  res.send("Update User - Not Implemented");
});

//
//
//Get User
//
server.get("/:_id", function(req,res,next){
  res.send("Get User - Not Implemented // _id: " + req.params._id);
});

//
//
//
//
//


//
//
//
//begin listening on port 8080
//
//
server.listen(8080, function(){
  console.log(server.name + " listening on ", server.url);
});
