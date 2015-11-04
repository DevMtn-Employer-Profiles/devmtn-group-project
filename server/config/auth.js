var passport = require('passport');

exports.authenticate = function(req, res, next){
	req.body.username = req.body.username.toLowerCase();
	var auth = passport.authenticate('devmtn');
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