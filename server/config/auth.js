var passport = require('passport');
var PassportLocal = require('passport-local').Strategy;
var User = require('../models/User');


exports.authenticat = function(req, res, next){
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
