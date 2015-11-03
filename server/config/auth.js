var passport = require('passport');
var PassportLocal = require('passport-local').Strategy;
var User = require('../models/User');

// tims code
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
//dougs code 
exports.authenticate = function(req, res, next){
	req.body.username = req.body.username.toLowerCase();
	var auth = passport.authenticate('local', function(err, user){
		if(err){
			return next(err);
		}
		if(!user){
			res.send({success:false});
		}
		req.login(user, function(err){
			if(err) {return next(err);}
			res.send({
				success: true,
				user: user
			});
		});
	});
	auth(req, res, next);
};

exports.requiresApiLogin = function(req, res, next){
	if(!req.isAuthenticated()){
		res.status(403).end();
	} else {next();}
};

exports.requiresRole = function(role){
	return function(req, res, next){
		if(!req.isAuthenticated() || req.user.roles.indexOf(role) === -1){
			res.status(403).end();
		} else {next();}
	}
};
