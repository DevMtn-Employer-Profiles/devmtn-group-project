var Profile = require('mongoose').model('Profile');

//**********GET Requests 
exports.getProfiles = function(req, res){
	Profile.find({}).exec(function(err, collection){
		res.send(collection);
	});
};

exports.getPendingProfile = function(req, res){
	Profile.find({isPending:true}).exec(function(err, collection){
		res.send(collection);
	});
};
//*********POST Requests
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
//***********PUT Requests
exports.updateProfile = function(req, res){
	var companyUpdates = req.body;
	return Profile.findByIdAndUpdate(req.params.id, companyUpdates,function(err, schema){
		if(err){return res.send(err)};
		return res.send(companyUpdates);
	})
};
//**********DELETE Requests
exports.removeProfile = function(req, res){
	Profile.findByIdAndRemove({'_id':req.params.id}, function(err){
		if(err){
			return res.status(400).send({reason:err.toString()});
		} else {res.end()};
	});
};