var Match = require('mongoose').model('StudentMatch');

exports.runMatch = function(req, res) {
	
}

var buildMatch = function(employers, students, expiration) {
	//run the match on each employer against the 
	//given student list
	var matches = [];
	employers.forEach(function(employer) {
		students.forEach(function(student) {
			var missingNum = algorithm(employer, student);
			//save the match data if they atleast had one match
			if(missingNum === -1) {
				var matchData = {
					employer: employer._id,
					student: student._id,
					expirationDate: expiration
				};
				matches.push(matchData);
			}
		});
	})
}

var algorithm = function(employer, student) {
	//how many skills does the employer need
	var missingMatches = employer.skills.length;
	//how many skills of the employers does the
	//student have?
	employer.skills.forEach(function(skill) {
		if(student.skills.indexOf(skill) != -1) {
			missingMatches--;
		}
	});
	//if there were no matches return -1
	if(missingMatches === employer.skills.length){
		return -1;
	}
	return missingMatches;
}

var saveData = function(matchData, res){
	var i = 0;
	var errors = 0;
	var max = matchData.length;
	Match.create(matchData, function(err, result) {
			if(err) {
				errors++;
			}
			i++;
			if(i === max){
				res.json('Done with '+errors+' errors.');
			}
		});
}