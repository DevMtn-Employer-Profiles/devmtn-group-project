var mongoose = require('mongoose'),
    profile = require('../controllers/profile'),
    skill = require('../controllers/skills'),
    auth = require('../controllers/auth'),
    passport = require('passport');

module.exports = function (app){
  /**********Endpoints**********/
  //Profiles
  app.get('/api/profile', profile.getProfile);
  app.post('/api/profile', profile.createProfile);
  //Skills
  app.get('/api/skills', skill.getSkills);
  app.post('/api/skills', skill.createSkill);
  //Auth(Temporary?)
  app.post('/api/auth/signup', auth.localSignup);
  app.get('/api/auth/login', passport.authenticate('local'));
  //Catch-all api errors
  app.all('/api/*', function(req, res){
    res.send(404);
  });

  //Catch-all route errors
  app.get('/', function(req, res){
    res.render('index');
  });
};
