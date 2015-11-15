var mongoose = require('mongoose'),
    profile = require('../controllers/profile'),
    skill = require('../controllers/skills'),
    passport = require('passport'),
    session = require('express-session'),
    devmtn = require('./devmtnAuthConfig'),
    devmtnCtrl = require('../controllers/devmtnAuthCtrl'),
	studentMatchCtrl = require('../controllers/studentMatchCtrl');


module.exports = function (app){
	/**********Endpoints**********/
	//Profiles - Admin
	app.get('/api/profiles/all', profile.getProfiles);
	app.get('/api/profiles/pending', profile.getPendingProfiles);
	app.get('/api/profiles/:id', profile.getProfileById);
	app.post('/api/profiles', profile.createProfile);
	app.put('/api/profiles/accept/:id', profile.acceptProfile);
	app.put('/api/profiles/:id', profile.updateProfile);
	app.delete('/api/profiles/:id', profile.removeProfile);
	
	//Profiles - Employer
	app.get('/api/myProfile/', devmtnCtrl.requireEmployerRole, profile.getMyProfile);
	
	//Student Match
	app.get('/api/matches/:id', profile.getMatches);
	app.get('/api/students', studentMatchCtrl.getStudents);
	app.post('/api/algorithm', studentMatchCtrl.runAlgorithm);
	
	//Skills
	app.get('/api/skills', skill.getSkills);
	app.post('/api/skills', skill.createSkill);
	app.delete('/api/skills/:id', skill.removeSkill);
	app.put('/api/skills/:id', skill.updateSkill);
	
	//Authentication
	app.get('/auth/devmtn', passport.authenticate('devmtn'));
	app.get('/auth/devmtn/callback', passport.authenticate('devmtn', {
		failureRedirect: '/#/landing'
		}), devmtnCtrl.loginSuccessRouter);
	app.get('/auth/logout', devmtnCtrl.logout);
	app.get('/auth/currentUser', devmtnCtrl.currentUser);
	
	//Catch-all api errors
	app.all('/api/*', function(req, res){
		res.sendStatus(404);
	});

  	//Catch-all route errors
	app.get('/', function(req, res){
		res.render('index');
	});
};
