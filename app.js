var fs = require('fs');
var express = require('express')
  , ws = require('ws')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 8000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

var server = http.createServer(app);
/*
// Start Binary.js server
var BinaryServer = require('binaryjs').BinaryServer;

// link it to express
var bs = BinaryServer({server: server});

bs.on('connection', function(client){

  // Incoming stream from browsers
  client.on('stream', function(stream, meta){

    // broadcast to all other clients
    for(var id in bs.clients){
      if(bs.clients.hasOwnProperty(id)){
        var otherClient = bs.clients[id];
        if(otherClient != client){
          var send = otherClient.createStream(meta);
          stream.pipe(send);
        }
      }
    }
  });
});
*/
server.listen(8000);
console.log('HTTP server started on port 8000');

app.get('/', routes.index);
//app.get('/users', user.list);


/*
http.createServer(app).listen(app.get('port'), function(){
  console.log("Express  listening on port " + app.get('port'));
});
*/


////////////////////////
/*
var fs = require('fs');
var http = require('http');

// Serve client side statically
var express = require('express');
var app = express();
app.use(express.static(__dirname + '/public'));

var server = http.createServer(app);

// Start Binary.js server
var BinaryServer = require('../../').BinaryServer;

// link it to express
var bs = BinaryServer({server: server});

// Wait for new user connections
bs.on('connection', function(client){

  // Incoming stream from browsers
  client.on('stream', function(stream, meta){

    // broadcast to all other clients
    for(var id in bs.clients){
      if(bs.clients.hasOwnProperty(id)){
        var otherClient = bs.clients[id];
        if(otherClient != client){
          var send = otherClient.createStream(meta);
          stream.pipe(send);
        }
      }
    }
  });
});

server.listen(9000);
console.log('HTTP and BinaryJS server started on port 9000');
*/