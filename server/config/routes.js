var mongoose = require('mongoose'),
    profile = require('../controllers/profile'),
    skill = require('../controllers/skills');

module.exports = function (app){
  /**********Endpoints**********/
  //Profiles
  app.get('/api/profile',/*auth.requiresApiLogin(),*/ profile.getProfiles);
  app.get('/api/profile/pending',/*auth.requiresRole('admin'),*/ profile.getPendingProfile);
  app.post('/api/profile', profile.createProfile);
  app.put('/api/profile/:id', profile.updateProfile);
  app.delete('/api/profile/:id', profile.removeProfile);
  //Skills
  app.get('/api/skills',/*auth.requiresApiLogin(),*/ skill.getSkills);
  app.post('/api/skills', skill.createSkill);
  app.delete('/api/skills/:id', skill.removeSkill);
  //Catch-all api errors
  app.all('/api/*', function(req, res){
    res.send(404);
  });

  //Catch-all route errors
  app.get('/', function(req, res){
    res.render('index');
  });
};
