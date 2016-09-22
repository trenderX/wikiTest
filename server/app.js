// let us use .env file variables 
require('dotenv').load();
var path = require('path');
//testing axios api client
require('./requestGenerator')
//nodejs framework & sessions
var express = require('express');
//display messages in dev mode
var morgan = require('morgan');
//parse body request, cookies
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
//defining the main router of the app
var router = require('./routes/mainRouter');

// create and run a real server.
var app = express();
// start the server && sockets
var port = process.env.PORT || 4550;
var io = require('socket.io').listen(app.listen(port));
// app.listen(port);
io.sockets.on('connection', function (socket) {
  console.log('socket.io client connected');
  io.sockets.emit('connected', {message: 'Connected to Socket Server'});
});

// Use morgan to log requests to our express server to the console
app.use(morgan('dev'));
// Parse incoming request bodies as JSON
app.use(bodyParser.json());
// Parse incoming cookies
app.use(cookieParser());

// Make io accessible to our router
app.use(function(req,res,next) {
    req.io = io;
    next();
});
// Mount our main router
app.use('/', router);

var distFolder = path.resolve(__dirname, '../client/');
app.use(express.static(distFolder));
app.get('*', function response(req, res) {
  res.sendFile(distFolder + '/index.html');
});

console.log("Server Listening on port: ", port);
