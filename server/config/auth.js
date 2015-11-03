var passport = require('passport');
var PassportLocal = require('passport-local').Strategy;
var User = require('../models/User');

passport.use(new PassportLocal(function(email, password, done) {
	User.find({email: email}, function(err, result) {
		if(err){console.error(err)}
		else if(!result) {
			//Invalid Email
			console.log("Invalid Email");
       		return done(null, false, {message: 'Invalid email'});		
		} else {
			if(password === result.password) {
				console.log("Login Success");
				//Valid Credentials
				return done(null, result);
			} else {
				//Invalid Password
				console.log("Invalid Password");
				return done(null, false, {message: 'Invalid password'});
			}
		}
	});
}));


//Serialization
passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    done(null, obj);
});
