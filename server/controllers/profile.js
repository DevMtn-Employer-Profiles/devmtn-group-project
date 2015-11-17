var Profile = require('mongoose').model('Profile'),
	Pending = require('mongoose').model('PendingProfile'),
	Students = require('./studentMatchCtrl');


//  --------------------------------------------  ADMIN CONTROLLERS

/*****GET Requests*****/ 
exports.getProfiles = function(req, res){
	Profile.find({})
		   .populate('profiles skills pendingprofiles')
		   .populate('profiles pendingProfile')
		   .exec(function(err, collection){
			   Pending.findById()
			   
		       res.send(collection);
		   });
};

exports.getProfileById = function(req, res){
	Profile.findById({'_id':req.params.id}).populate('skills').exec(function(err, profile){
		res.send(profile);
	});
};

exports.updateProfile = function(req, res){
	var companyUpdates = req.body;
	Profile.findByIdAndUpdate(req.params.id, companyUpdates, function(err, schema){
		if(err){ return res.send(err); }
		return res.send(companyUpdates);
	});
};


exports.getActiveProfiles = function(req, res) {
	Profile.find({isVisible: true})
		   .exec(function(err, collection) {
			   res.send(collection);
		   });
};

exports.getMyProfile = function(req, res) {
	//does the user have a profile?
	Profile.findOne({userId: req.user._id}).populate('skills').exec(function(err, result) {
		if(err) {
			res.status(500).send(err);
		} else {
			if(!result) {
				//no profile found for this user. create one
				console.log("Creating a new profile");
				var defaultProfile = {
					companyName: 'Company Name',
					userId: req.user._id,
					bio: 'Company Bio',
				};
				Profile.create(defaultProfile, function(err2, result2) {
					if(err2) {
						res.status(500).send(err2);
					} else {
						//their profile was created, return it.
						return res.json(result2);
					}
				})
			} else {
				console.log("user has a profile");
				//is their profile pending?
				if(!result.isPending) {
					console.log("Profile is not pending");
					//not pending, just return this profile
					return res.json(result);
				} else {
					console.log("Profile is pending");
					//their stuff is pending, return the pending profile
					Pending.findOne({userId: req.user._id}).populate('skills').exec(function(err3, result3) {
						if(err3) {
							res.status(500).send(err3);
						} else {
							console.log('returning the pending profile', result3);
							res.json(result3);
						}
					});
				}
			}
		}
	});
}

/*****PUT Requests*****/
exports.saveProfile = function(req, res) {
	//Is their profile pending?
	Profile.findOne({userId: req.user._id}).exec(function(err, result) {
		if(err) {
			res.status(500).send(err);
		} else {
			if(!result.isPending) {
				console.log('Profile is not pending');
				//Profile Not Pending
				
				//Save to Pending Collection
				Pending.create(req.body, function(err2, result2) {
					if(err2) {
						res.status(500).send(err2);
					} else {
						console.log('saved into pending collection');
						//Profile saved to collection.
						//Link the pending profile to the active profile
						Profile.findByIdAndUpdate(result._id, {isPending: true, pendingProfile: result2._id}, function(err3, result3) {
							if(err3) {
								res.status(500).send(err3);
							} else {
								console.log("Updated Profile");
								//done :)
								res.json(result2);
							}
						});
					}
				});
			} else {
				//Profile is Pending
				console.log('profile is currently pending');
				//update the pending collection
				var changes = req.body;
				//Set submit to false. when they save they need to resubmit for approval
				changes.submit = false;
				Pending.findByIdAndUpdate(req.body._id, changes, function(err4, result4) {
					if(err4) {
						res.status(500).send(err4);
					} else {
						console.log('updated pending table with submit set to false');
						//Finish
						res.json(result4);
					}
				})
			}
		}
	});
}

exports.requestApproval = function(req, res) {
	//find their profile on the collection table and set
	//the submit valut to true to mark it ready to be approved
	Pending.findOneAndUpdate({userId: req.user._id}, {$set: {submit: true}}).exec(function(err, result) {
		if(err) {
			res.status(500).send(err);
		} else {
			console.log('profile set to submit', result);
			res.json(result);
		}
	});
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
};

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
exports.acceptProfile = function(req, res) {
	var updateObj = {
		_id: req.params.id
	};
	Profile.findById(req.params.id, function(err, schema) {
		console.log(req.params.id)
		if (schema._doc.isPending) {
			Pending.findByIdAndRemove(req.params.id, function(err, pendProfile) {
				if (pendProfile) {
					updateObj = pendProfile._doc;
					delete updateObj.select;
					updateObj.isPending = false;
					updateObj.pendingProfile = undefined;
					console.log(updateObj);
				
					Profile.findByIdAndUpdate(updateObj._id, updateObj)
						   .exec(function(err, profile) {
								if (err) {
									console.log('Error', err);
								} else {
									res.json(profile._doc);
								}
							});
				}
			});
		} else {
			Profile.findByIdAndUpdate(req.body._id, req.body, function(err, profile) {
				if (err)
					return console.log(err);
				
				res.send(profile._doc);
			});
		}
	});
};

exports.rejectProfile = function(req, res) {
	Pending.findByIdAndUpdate(req.params.id, {submit: false}, function(err, profile) {
		if (err)
			return console.log(err);
		
		res.send(profile._doc);
	})
}

/*****DELETE Requests*****/
exports.removeProfile = function(req, res){
	Profile.findByIdAndRemove({'_id':req.params.id}, function(err, profile){
		if(err){
			return res.status(400).send({reason:err.toString()});
		} else {
			if (profile._docs.isPending) {
				Pending.findByIdAndRemove(req.params.id, function(err) {
					if (err) {
						res.send(err);
					} else res.end();
				});
			}
		}
	});
};
