var express = require('express'),
    bodyParser = require('body-parser'),
    passport = require('passport'),
    session = require('express-session');

module.exports = function(app, config){
  /**********Middleware*********/
  app.use(bodyParser.urlencoded({ extended: true  }));
  app.use(bodyParser.json());
  app.use(session({secret: 'hahahhaaha', resave: true, saveUninitialized:true}));//resave and saveUninitialized defaults are deprecated. They are set to the default values.
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(express.static(config.rootPath + '/public'));
};
