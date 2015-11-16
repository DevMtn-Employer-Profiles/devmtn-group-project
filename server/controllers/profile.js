var Profile = require('mongoose').model('Profile'),
	Pending = require('mongoose').model('PendingProfile'),
	Students = require('./studentMatchCtrl');


/*****GET Requests*****/ 
exports.getProfileById = function(req, res){
	Profile.findById({'_id':req.params.id}).populate('skills').exec(function(err, profile){
		res.send(profile);
	});
};

exports.getProfiles = function(req, res){
	Profile.find({})
		   .populate('profiles skills')
		   .populate('pendingprofiles')
		   .exec(function(err, collection){
		       res.send(collection);
		   });
};

exports.getPendingProfiles = function(req, res){
	Pending.find().exec(function(err, collection){
		res.send(collection);
	});
};

exports.getMyProfile = function(req, res) {
	if (req.user) {
		Profile.findOne({userId: req.user._id}).populate('skills').exec(function(err, profile) {
			// if(err)res.status(500).send();
			
			if (profile) {
				exports.createProfile(req, res)
			}
			
			res.json(profile);
		});
	}
	
	// res.status(401).send();
}

exports.getMatches = function(req, res) {
	var empId = req.params.id;
	//get the profile
	Profile.findOne({_id: empId}).exec(function(err, result) {
		if(err) {
			res.status(500).send(err);
		}
		//now we know which students we want
		Students.getStudents(req, res, result.studentMatches);
	});
}

/*****POST Requests*****/
exports.createProfile = function(req, res){
	var companyData = req.body;
	companyData.companyName = companyData.companyName;
	companyData.bio = companyData.bio;
	Profile.create(companyData, function(err, profile){
		if(err){
			if(err.toString().indexOf('E11000') > -1){
				err = new Error('Duplicate Company Name');
			}
			// if (res.statusCode <= 400)
			// 	return res.send({reason:err.toString()});
		} else {
			res.send(profile);
		}
			// console.log(profile);
	})
}

/*****PUT Requests*****/
exports.updateProfile = function(req, res){
	var companyUpdates = req.body;
	Profile.findByIdAndUpdate(req.params.id, companyUpdates, function(err, schema){
		if(err){ return res.send(err); }
		return res.send(companyUpdates);
	})
};

exports.acceptProfile = function(req, res) {
	
}
/*****DELETE Requests*****/
exports.removeProfile = function(req, res){
	Profile.findByIdAndRemove({'_id':req.params.id}, function(err){
		if(err){
			return res.status(400).send({reason:err.toString()});
		} else {res.end()};
	});
};