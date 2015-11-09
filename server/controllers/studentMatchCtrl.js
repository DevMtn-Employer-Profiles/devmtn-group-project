var StudentMatch = require('mongoose').model('StudentMatch');

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
