var mongoose = require('mongoose'),
    profile = require('../controllers/profile'),
    skill = require('../controllers/skills'),
    notification = require('../controllers/notification'),
    passport = require('passport'),
    session = require('express-session'),
    devmtn = require('./devmtnAuthConfig'),
    devmtnCtrl = require('../controllers/devmtnAuthCtrl');

module.exports = function (app){
  var requireLogin = function(req, res, next) {
    if(req.isAuthenticated) {
      next();
    } else {
      req.status(401).json('Permission Denied');
    }
  }
  var requireAdmin = function (req, res, next) {
    if(!req.isAuthenticated()) {
      res.status(401).json('Permission Denied');
    } else {
      if(req.user.isAdmin) {
        next();
      } else {
        res.status(401).send("This Resource requires admin status");
      }
    }
  }
  var requireEmployer = function (req, res, next) {
    if(!req.isAuthenticated()) {
      res.status(401).json('Permission Denied');
    } else {
      if(!req.user.isAdmin){
        next();
      } else {
        res.status(401).json('This resource requires Employer status');
      }
    }
  }
  /**********Middleware*********/
  app.use(session({secret: 'hahahhaaha'}));
  app.use(passport.initialize());
  app.use(passport.session());
  /**********Endpoints**********/
  //Profiles
  app.get('/api/profile',requireEmployer, profile.getProfile);
  app.post('/api/profile', requireEmployer, profile.createProfile);
  app.put('/api/profile', requireEmployer, profile.updateProfile);
  app.delete('/api/profile/:id', requireLogin, profile.removeProfile);
  //Skills
  app.get('/api/skills',/*auth.requiresApiLogin(),*/ skill.getSkills);
  app.post('/api/skills', skill.createSkill);
  app.delete('/api/skills/:id', skill.removeSkill);
  //Notifications
  app.get('/api/notifications', notification.getNotifications);
  app.delete('/api/notifications/:id', requireAdmin, notification.deleteNotification);
  app.post('/api/notifications', notification.addNotification);
  //Authentication
  app.get('/auth/devmtn', passport.authenticate('devmtn'), function(req, res) {
    //Doesn't get called?
    console.log('Ha ha this should not ever get printed to the console');
  });
  app.get('/auth/devmtn/callback', passport.authenticate('devmtn', {
        failureRedirect: '/#/landing'
      }), devmtnCtrl.loginSuccessRouter);
  app.get('/auth/logout', devmtnCtrl.logout);
  app.get('/auth/currentUser', devmtnCtrl.currentUser);
  //Catch-all api errors
  app.all('/api/*', function(req, res){
    res.send(404);
  });

  //Catch-all route errors
  app.get('/', function(req, res){
    res.render('index');
  });
};
