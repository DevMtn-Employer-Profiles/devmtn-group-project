var mongoose = require('mongoose');

module.exports = function (app){
  //Endpoints

  //Catch-all api errors
  app.all('/api/*', function(req, res){
    res.send(404);
  });

  //Catch-all route errors
  app.get('*', function(req, res){
    res.render('index');
  });
};
