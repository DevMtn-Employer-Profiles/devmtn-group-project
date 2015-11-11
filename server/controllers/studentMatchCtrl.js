// var StudentMatch = require('mongoose').model('StudentMatch');
var Request = require('request'),
	Profile = require('mongoose').model('Profile');

exports.getStudents = function() {
	Request('http://profiles.devmounta.in/api/studentPortfolio', function(error, response, body) {
		if (error) {
			return false;
		} else {
			var newBody = JSON.parse(body);
			var profiles = newBody.filter(function(item){
				if (item.showProfile) {
					return true;
				} else {
					return false;
				}
			})
			return profiles;
		}
	})
}

exports.getCertainStudents = function(req, res, students) {
	Request('http://profiles.devmounta.in/api/studentPortfolio', function(error, response, body) {
		if (error) {
			res.status(500).send(error);
		} else {
			var newBody = JSON.parse(body);
			var profiles = newBody.filter(function(item){
				if (item.showProfile && students.indexOf(item._id) != -1) {
					return true;
				} else {
					return false;
				}
			})
			res.json(profiles);
		}
	})
}