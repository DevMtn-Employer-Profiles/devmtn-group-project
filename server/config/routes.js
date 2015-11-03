var mongoose = require('mongoose'),
    profile = require('../controllers/profile'),
    skill = require('../controllers/skills'),
    notification = require('../controllers/notification');

module.exports = function (app){
  /**********Endpoints**********/
  //Profiles
  app.get('/api/profile', profile.getProfile);
  app.post('/api/profile', profile.createProfile);
  //Skills
  app.get('/api/skills', skill.getSkills);
  app.post('/api/skills', skill.createSkill);
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
