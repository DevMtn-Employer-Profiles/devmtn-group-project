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
	app.get('/api/profile/all',/*auth.requiresApiLogin(),*/ profile.getProfiles);
	app.get('/api/profile/pending',/*auth.requiresRole('admin'),*/ profile.getPendingProfile);
	app.get('/api/profile/active', profile.getActiveProfiles);
	app.get('/api/profile/inactive', profile.getInactiveProfile);
	app.get('/api/profile/:id', profile.getProfileById);
	app.get('/api/myProfile/', devmtnCtrl.requireEmployerRole, profile.getMyProfile);
	app.post('/api/profile', profile.createProfile);
	app.put('/api/profile/:id', profile.updateProfile);
	app.delete('/api/profile/:id', profile.removeProfile);
	//Student Match
	app.get('/api/studentMatch', devmtnCtrl.requireEmployerRole, studentMatchCtrl.getMatches);
	app.post('/api/studnentMatch', studentMatchCtrl.createMatch);
	//Skills
	app.get('/api/skills',/*auth.requiresApiLogin(),*/ skill.getSkills);
	app.post('/api/skills', skill.createSkill);
	app.delete('/api/skills/:id', skill.removeSkill);
	app.put('/api/skills/:id', skill.updateSkill);
	//Notifications
	app.get('/api/notifications', notification.getNotifications);
	app.delete('/api/notifications/:id',  notification.deleteNotification);
	app.post('/api/notifications', notification.addNotification);
	app.put('/api/notifications/:id', notification.updateNotification);
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
