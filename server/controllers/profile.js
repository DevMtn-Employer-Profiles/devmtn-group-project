var Profile = require('mongoose').model('Profile');

exports.getProfile = function(req, res){
	Profile.find({}).exec(function(err, collection){
		res.send(collection);
	});
};

exports.createProfile = function(req, res, next){
	var companyData = req.body;
	companyData.companyName = companyData.companyName;
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
	
	if(req.profile._id != companyUpdates._id && !req.profile.hasRole('admin')){
		res.send(403);
		return res.end();
	}
}