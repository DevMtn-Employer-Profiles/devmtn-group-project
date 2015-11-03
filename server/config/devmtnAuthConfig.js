var passport = require('passport');
var DevMtnStrategy = require('devmtn-auth');

var config = {
	app: 'app_name_placeholder',
	client_token: 'client_token_placeholder',
	callbackURL: 'callbackURL_placeholder',
	jwtSecret: 'jwtSecret_placeholder'
}

passport.use('devmtn', new DevMtnStrategy(config, function(jwtoken, user, done) {
	//just return the user
	return done(null, user);
}));

exports.logout = function(req, res) {
	req.logout();
	res.send();
}