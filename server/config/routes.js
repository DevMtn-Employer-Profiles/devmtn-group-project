var mongoose = require('mongoose'),
    profile = require('../controllers/profile'),
    skill = require('../controllers/skills'),
    notification = require('../controllers/notification');

module.exports = function (app){
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
  //Catch-all api errors
  app.all('/api/*', function(req, res){
    res.send(404);
  });

  //Catch-all route errors
  app.get('/', function(req, res){
    res.render('index');
  });
};
