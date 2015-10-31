var express = require('express'),
    bodyParser = require('body-parser');

module.exports = function(app, config){

  app.use(bodyParser.urlencoded({ extended: true  }));
  app.use(bodyParser.json());
  app.use(express.static(config.rootPath + '/public'));
};
