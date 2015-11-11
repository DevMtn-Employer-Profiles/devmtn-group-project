var mongoose = require('mongoose'),
    profile = require('../controllers/profile'),
    skill = require('../controllers/skills'),
    notification = require('../controllers/notification'),
    passport = require('passport'),
    session = require('express-session'),
    devmtn = require('./devmtnAuthConfig'),
    devmtnCtrl = require('../controllers/devmtnAuthCtrl'),
	studentMatchCtrl = require('../controllers/studentMatchCtrl');


module.exports = function (app){
	/**********Endpoints**********/
	//Profiles
	app.get('/api/profile/all', profile.getProfiles);
	app.get('/api/profile/pending', profile.getPendingProfiles);
	app.get('/api/profile/:id', profile.getProfileById);
	app.get('/api/myProfile/', devmtnCtrl.requireEmployerRole, profile.getMyProfile);
	app.post('/api/profile', profile.createProfile);
	app.post('/api/profile/pending/:id'. profile.createPendingProfile);
	app.put('/api/profile/:id', profile.updateProfile);
	app.put('/api/profile/pending/:id', profile.updatePendingProfile);
	app.delete('/api/profile/:id', profile.removeProfile);
	//Student Match
	app.get('/api/studentMatch', studentMatchCtrl.getMatches);
	app.get('/api/students', studentMatchCtrl.getStudents);
	//Skills
	app.get('/api/skills', skill.getSkills);
	app.post('/api/skills', skill.createSkill);
	app.delete('/api/skills/:id', skill.removeSkill);
	app.put('/api/skills/:id', skill.updateSkill);
	//Authentication
	app.get('/auth/devmtn', passport.authenticate('devmtn'), function(req, res) {
		//Doesn't get called?
		console.log('Ha ha this should not ever get printed to the console');
	});
	// app.get('/auth/devmtn/callback', passport.authenticate('devmtn', {
	//       failureRedirect: '/#/landing',
	//       successRedirect: '/#/employer'
	//     }));
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
