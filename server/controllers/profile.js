var Profile = require('mongoose').model('Profile');

exports.getProfile = function(req, res){
	Profile.find({_id: req.user}).exec(function(err, collection){
		res.send(collection);
	});
};

exports.createProfile = function(req, res, next){
	var companyData = req.body;
	companyData.companyName = companyData.companyName.toLowerCase();
	companyData.bio = companyData.bio;
	Profile.create(companyData, function(err, profile){
		if(err){
			if(err.toString().indexOf('E11000') > -1){
				err = new Error('Duplicate Company Name');
			}
			return res.status(400).send({reason:err.toString()});
		} else{res.end();}
	})
}
exports.updateProfile = function(req, res){
	var companyUpdates = req.body;
	
	if(req.profile._id != companyUpdates._id && !req.user.hasRole('admin')){
		return res.status(403).end();
	}
	req.profile.companyName = companyUpdates.companyName.toLowerCase();
	req.profile.bio = companyUpdates.bio;
	req.profile.facts = companyUpdates.facts;
	req.profile.skills = companyUpdates.skills;
	req.profile.save(function(err){
		if(err){
			return res.status(400).send({reason: err.toString()});
		}
		res.send(req.profile);
	});
};
exports.removeProfile = function(req, res){
	Profile.findByIdAndRemove({'_id':req.params.id}, function(err){
		if(err){
			return res.status(400).send({reason:err.toString()});
		} else {res.end()};
	});
};