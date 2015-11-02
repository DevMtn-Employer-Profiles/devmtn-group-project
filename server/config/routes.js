var mongoose = require('mongoose'),
    profile = require('../controllers/profile');

module.exports = function (app){
  //Endpoints
  app.get('/api/profile', profile.getProfile);
  app.post('/api/profile', profile.createProfile);
  //Catch-all api errors
  app.all('/api/*', function(req, res){
    res.send(404);
  });

  //Catch-all route errors
  app.get('/', function(req, res){
    res.render('index');
  });
};
