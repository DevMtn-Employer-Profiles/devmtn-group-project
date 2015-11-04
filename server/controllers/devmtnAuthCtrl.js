var passport = require('passport'),
	Devmtn = require('devmtn-auth'),
	DevmtnStrategy = Devmtn.Strategy,
	User = require('../models/User'),
	Profile = require('../models/Profile');

passport.use('devmtn', new DevmtnStrategy(function (jwtoken, user, done) {
	console.log('devmtn profile: ', user);
	//don't allow anyone with student role to register as an employer. don't allow admins to create a company profile
	if (Devmtn.checkRoles(user, 'student')) {
		console.log('Students should not login as an employer.')
		done(null, false, { message: 'Students not allowed on Employers site' });
	} else if (Devmtn.checkRoles(user, 'admin')) {
		console.log('admin user, free access, does not need to be created in database.');
		done(null, user);
	}
	User.findOne({ email: user.email }, function (findErr, foundUser) {
		if (findErr) return done(findErr, false);
		if (!foundUser) {
			//New User
			var newUser = {
				firstName: user.first_name,
				lastName: user.last_name,
				email: user.email,
				devmtnId: user.id,
				roles: user.roles
			};
			User.create(newUser, function (createErr, createdUser) {
				if (createErr) return done(createErr, null);
				console.log('Created a new user: ', createdUser);
				//Create a new profile for the new user
				var prof = {
					companyName: 'Company Name Here',
					userId: createdUser._id,
					bio: 'Bio goes here'
				}
				//if it is an admin, don't create a profile
				if (Devmtn.checkRoles(user, 'admin')) {
					return done(null, createdUser);
				}
				Profile.create(prof, function (profileErr, newProfile) {
					if (profileErr) return done(profileErr, null);
					console.log("Created a profile for the new user: ", newProfile);
					return done(null, createdUser);
				})
			});
		} else {
			//Existing user found in my database
			console.log('Found an existing user: ', foundUser);
			foundUser.devmtnId = user.id;
			//Make sure the id's still match up
			foundUser.save(function (saveErr, savedUser) {
				if (saveErr) return done(saveErr, savedUser);
				console.log('savedUser: ', savedUser);
				return done(null, savedUser);
			});
		}
	});
}));

passport.serializeUser(function (user, done) {
	//req.user will have their ID as well as if they are an admin. Just a nifty
	//way to track this variable without making multiple checks.
	var cerealUser = {
		isAdmin: false,
		_id: user._id
	};
	if(Devmtn.checkRoles(user, 'admin')) {
		cerealUser.isAdmin = true;
	}
	done(null, cerealUser);
});
passport.deserializeUser(function (_id, done) {
	done(_id, null);
});

module.exports = {
	logout: function (req, res) {
		req.logout();
		res.redirect('/#/');
	},
	loginSuccessRouter: function (req, res) {
		//Redirect admins to the admin view and employers 
		//to the employer view. Students will not get authorized so they should not end up here
		if(req.user.isAdmin) {
			res.redirect('/#/admin');
		} else {
			res.redirect('/#/employer');
		}
	},
	currentUser: function(req, res) {
		//Return the currently logged in user
		if(req.isAuthenticated()) {
			res.json(req.user);
		} else {
			res.status(401).send();
		}
	}
}