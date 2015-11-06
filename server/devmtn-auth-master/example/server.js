var express = require('express');
var session = require('express-session');
var port = 8000;
var bodyParser = require('body-parser');
var passport = require('passport');
var Devmtn = require('devmtn-auth');
var DevmtnStrategy = Devmtn.Strategy;
var devmtnAuthConfig = require('./devmtnAuthConfig.js')

var app = express();

// Morgan is not required, but nice for development
var morgan = require('morgan');
app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({
  secret: 'Dallindoesntlikemychoiceofsecrets',
  resave: true,
  saveUninitialized: false
}))
app.use(express.static(__dirname + '/public'));


// Start server
app.listen(port, function() {
  console.log('listening on port ' + port);
})
