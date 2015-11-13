// var StudentMatch = require('mongoose').model('StudentMatch');
var Request = require('request'),
	Profile = require('mongoose').model('Profile');

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

exports.getCertainStudents = function(req, res, students) {
	Request('http://profiles.devmounta.in/api/studentPortfolio', function(error, response, body) {
		if (error) {
			res.status(500).send(error);
		} else {
			var newBody = JSON.parse(body);
			var profiles = newBody.filter(function(item){
				if (item.showProfile && students.indexOf(item._id) != -1) {
					return true;
				// Tim needs to fix, line 30. It is not working properly. 
				} else {
					return false;
				}
			})
			res.json(profiles, students);
		}
	})
}

exports.runAlgorithm = function(req, res) {
	//This is the function where the magic happens
	//of matching students to the employers.
	var employers = req.body.employers;
	var students = req.body.students;
	
	//Go through each employer and compare the students
	//to the employers requirements
	employers.forEach(function(employer, employerIndex, employerArray) {
		//Go through each student and determine how good
		//a match they are. Sort them?
		var employersMatches = [];
		students.forEach(function(stud) {
			//Are they willing to relocate?
			if(employer.relocation) {
				if(stud.relocation.text === 'Yes') {
					//They got lucky, hopefully it continues
				} else {
					//Nope. They Die.
					return null;
				}
			}
			//If they aren't dead, lets continue
			//how many skills does the student match?
			var skillsStudentMatched = 0;
			var skillsNeededToMatch = employer.skills.length;
			var checkString = stud.skills.toLowerCase();
			console.log("CHECK: ", checkString);
			console.log("AGAINST: ", employer.skills);
			employer.skills.forEach(function(skill) {
				//This is where the original code is shooting us in the face :()
				//Hopefully this code will change when we go live.
				if(checkString.indexOf(skill.name) != -1) {
					//the string contained the exact skill match.
					skillsStudentMatched++;
				}
			});
			
			//alright how good of a match are they?
			var matchDetails = {};
			matchDetails.matchPercent = skillsStudentMatched/skillsNeededToMatch;
			matchDetails.student = stud._id;
			matchDetails.studentName = stud.name.first+' '+stud.name.last;
			//Save the details until we finish determing match closeness.
			employersMatches.push(matchDetails);
		});
		//OK. Lets save the matches to the employer
		var changes = {studentMatches: employersMatches};
		Profile.findByIdAndUpdate(employer._id, changes, function(err, result) {
			if(err) {
				console.error("Crap the algorithm threw an error :(", err);
			} else {
				if(employerIndex === employerArray.length-1) {
					//I guess we are done!
					console.log("COMPLETED MATCHING");
					res.json('WE DID IT!');
				}
			}
		});
	})
	
	//questions. how enforcable is the willing to relocate? is it
	//a do or die, or how should we handle that?
	
	//quesiton: how many matches do we send the employer? Should
	//I send all of them in order, or max out at five?
}