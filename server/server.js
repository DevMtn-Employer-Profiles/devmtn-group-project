var express = require('express');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var app = express();
var config = require('./config/config.js')[env];

require('./config/express.js')(app, config);
require('./config/mongoose.js')(config);
require('./config/routes.js')(app);

app.listen(config.port);
console.log('Listening on port ' + config.port + ', Dragonborn');
