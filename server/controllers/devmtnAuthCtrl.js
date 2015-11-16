var passport = require('passport'),
	Devmtn = require('devmtn-auth'),
	DevmtnStrategy = Devmtn.Strategy,
	DevmtnAuthConfig = require('../config/devmtnAuthConfig'),
	User = require('../models/User');

passport.use('devmtn', new DevmtnStrategy(DevmtnAuthConfig, function (jwtoken, user, done) {
	//don't allow anyone with student role to register as an employer. don't allow admins to create a company profile
	if (user.hasOwnProperty('roles') && Devmtn.checkRoles(user, 'student')) {
		console.log('Students should not login as an employer.')
		return done(null, false, { message: 'Students not allowed on Employers site' }); 
	} else if (user.hasOwnProperty('roles') && Devmtn.checkRoles(user, 'admin')) {
		console.log('admin user, free access, does not have a profile.');
		return done(null, user);
	}
	User.findOne({ email: user.email }, function (findErr, foundUser) {
		if (findErr) return done(findErr, false);
		if (!foundUser) {
			//New User
			var newUser = {
				firstName: user.first_name,
				lastName: user.last_name,
				email: user.email,
				devmtnId: user.id
			};
			User.create(newUser, function (createErr, createdUser) {
				if (createErr) return done(createErr, null);
				console.log("Welcom to our new user, ",createdUser);
				return done(null, createdUser);
			});
		} else {
			//Existing user found in my database
			console.log('Welcome back, '+foundUser.firstName+' '+foundUser.lastName);
			foundUser.devmtnId = user.id;
			//Make sure the id's still match up
			return done(null, foundUser);
		}
	});
}));

passport.serializeUser(function (user, done) {
	console.log("Serializing");
	done(null, user);
});
passport.deserializeUser(function (obj, done) {
	done(null, obj);
});

module.exports = {
	logout: function (req, res) {
		req.logout();
		res.redirect('/#/');
	},
	loginSuccessRouter: function (req, res) {
		console.log("Login Success");
		console.log('The User: ', req.user);
		//Redirect admins to the admin view and employers 
		//to the employer view. Students will not get authorized so they should not end up here
		if(req.user.hasOwnProperty('roles') && Devmtn.checkRoles(req.user, 'admin')) {
			console.log("Redirecting to admin");
			res.redirect('/#/admin')
		} else {
			console.log("Redirecting to employer");
			// res.send('to employer');
			res.redirect('/#/employer/home')
		}
	},
	currentUser: function(req, res) {
		console.log(req.user);
		//Return the currently logged in user
		if(req.isAuthenticated()) {
			res.json(req.user);
		} else {
			res.status(401).send();
		}
	},
	requireAdminRole: function(req, res, next) {
		console.log(req.user);
		//only call next if the user has admin status
		if(req.isAuthenticated() && req.user.isAdmin) {
			next();
		} else {
			res.status(401).json('Resource available for admins only');
		}
	},
	requireEmployerRole: function(req, res, next) {
		console.log(req.isAuthenticated());
		if(req.isAuthenticated() && !req.user.isAdmin) {
			next();
		}  else  {
			res.status(401).json('Resource available for employers only');
		}
	}
}