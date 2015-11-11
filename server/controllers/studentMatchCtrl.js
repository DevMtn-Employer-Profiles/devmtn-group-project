var StudentMatch = require('mongoose').model('StudentMatch');
var Request = require('request');

exports.createMatch = function(req, res) {
	StudentMatch.create(req.body, function(err, result){
		if (err) {
			res.status(500).send(err);
		} else {
			res.json(result);
		}
	});
	
};

exports.getMatches = function(req, res) {
	StudentMatch.find({employerId: req.user._id}).exec(function(err, result) {
		if (err) {
			res.status(500).send(err);
		} else {
			res.json(result);
		}
	})
};

exports.getStudents = function(req, res) {
	Request('http://profiles.devmounta.in/api/studentPortfolio', function(error, response, body) {
		if (error) {
			res.status(500).send(error);
		} else {
			var newBody = JSON.parse(body);
			var profiles = newBody.filter(function(item){
				if (item.showProfile) {
					return true;
				} else {
					return false;
				}
			})
			res.json(profiles);
		}
	})
}
