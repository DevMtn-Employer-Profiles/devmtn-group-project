var User = require('../models/User');

//Exports
exports.localSignup = function(req, res) {
	console.log("Signing up: ", req.body);
	User.create(req.body, function(err, result) {
		if(err) { console.log(err); }
		else {
			res.json(result);
		}
	})
}

exports.logout = function(req, res) {
	req.logout();
	res.send();
}