var Profile = require('mongoose').model('Profile');

exports.getProfile = function(req, res){
	Profile.find({}).exec(function(err, collection){
		res.send(collection);
	});
};

exports.createProfile = function(req, res, next){
	var companyData = req.body;
	companyData.companyName = companyData.company_name.toLowerCase();
	companyData.bio = companyData.bio;
	Profile.create(companyData, function(req, res, next){
		if (err){
			if(err.toString.indexOf('E11000') > -1){
				err = new Error('Duplicate Company Name');
			}
			res.send(400);
			return res.send({reason:err.toString()});
		}
		req.login(user, function(err){
			if(err){return next(err);}
			res.send(user);
		})
	})
}
exports.updateProfile = function(req, res){
	var companyUpdates = req.body;
	
	if(req.profile._id != companyUpdates._id && !req.profile.hasRole('admin')){
		res.send(403);
		return res.end();
	}
}