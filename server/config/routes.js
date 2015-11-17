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
	//Profiles - Public
	app.get('/api/profiles/active', profile.getActiveProfiles);	
	
	//Profiles - Admin
	app.get('/api/profiles/all', profile.getProfiles);
	app.get('/api/profiles/:id', profile.getProfileById);
	app.put('/api/profiles/accept/:id', profile.acceptProfile);
	app.put('/api/profiles/reject/:id', profile.rejectProfile);
	app.put('/api/profiles/:id', profile.updateProfile);
	app.delete('/api/profiles/:id', profile.removeProfile);
	
	//Profiles - Employer
	app.get('/api/my-profile', /*devmtnCtrl.requireEmployerRole,*/ profile.getMyProfile);
	app.put('/api/my-profile', profile.saveProfile);
	app.put('/api/my-profile/request-approval', profile.requestApproval);

	//Student Match
	app.get('/api/matches/:id', profile.getMatches);
	app.get('/api/students', studentMatchCtrl.getStudents);
	app.post('/api/algorithm', studentMatchCtrl.runAlgorithm);
	
	//Skills
	app.get('/api/skills', skill.getSkills);
	app.post('/api/skills', skill.createSkill);
	app.put('/api/skills/:id', skill.updateSkill);
	app.delete('/api/skills/:id', skill.removeSkill);
	
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
		console.log('Wrong spot');
		res.render('index');
	});
};
