var mongoose = require('mongoose'),
    profile = require('../controllers/profile'),
    skill = require('../controllers/skills');

module.exports = function (app){
  /**********Endpoints**********/
  //Profiles
  app.get('/api/profile', profile.getProfile);
  app.post('/api/profile', profile.createProfile);
  //Skills
  app.get('/api/skills', skill.getSkills);
  app.post('/api/skills', skill.createSkill);
  //Catch-all api errors
  app.all('/api/*', function(req, res){
    res.send(404);
  });

  //Catch-all route errors
  app.get('/', function(req, res){
    res.render('index');
  });
};
