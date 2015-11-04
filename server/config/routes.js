var mongoose = require('mongoose'),
    profile = require('../controllers/profile'),
    skill = require('../controllers/skills'),
    notification = require('../controllers/notification'),
    passport = require('passport'),
    session = require('express-session'),
    devmtn = require('./devmtnAuthConfig');

module.exports = function (app){
  /**********Middleware*********/
  app.use(session({secret: 'hahahhaaha'}));
  app.use(passport.initialize());
  app.use(passport.session());
  /**********Endpoints**********/
  //Profiles
  app.get('/api/profile',/*auth.requiresApiLogin(),*/ profile.getProfile);
  app.post('/api/profile', profile.createProfile);
  app.put('/api/profile', profile.updateProfile);
  app.delete('/api/profile/:id', profile.removeProfile);
  //Skills
  app.get('/api/skills',/*auth.requiresApiLogin(),*/ skill.getSkills);
  app.post('/api/skills', skill.createSkill);
  app.delete('/api/skills/:id', skill.removeSkill);
  //Notifications
  app.get('/api/notifications', notification.getNotifications);
  app.delete('/api/notifications/:id', notification.deleteNotification);
  app.post('/api/notifications', notification.addNotification);
  //Authentication
  app.get('/auth/devmtn', passport.authenticate('devmtn'), function(req, res) {
    //Doesn't get called?
    console.log('Ha ha this should not ever get printed to the console');
  });
  app.get('/auth/devmtn/callback', passport.authenticate('devmtn', {
        failureRedirect: '/#/landing'
      }), function(req, res) {
        res.status(200).send();
      });
  //Catch-all api errors
  app.all('/api/*', function(req, res){
    res.send(404);
  });

  //Catch-all route errors
  app.get('/', function(req, res){
    res.render('index');
  });
};
