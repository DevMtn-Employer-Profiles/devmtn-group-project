var Skill = require('mongoose').model('Skill');
/*****GET Requests*****/ 
exports.getSkills = function(req, res){
	Skill.find({}).exec(function(err, collection){
		res.send(collection);
	});
};
exports.getSkillById = function(req, res) {
	Skill.findById(req.params.id, function(err, skill) {
		if (err)
			return res.send(err);
		
		res.json(skill);
	})
}
/*****POST Requests*****/ 
exports.createSkill = function(req, res, next){
	var skillsData = req.body;
	skillsData.name = skillsData.name.toLowerCase();
	skillsData.created_on = Date.now();
	Skill.create(skillsData, function(err, skill){
		if(err){
			if(err.toString().indexOf('E11000') > -1){
				err = new Error('Skill already exists');
			};
			return res.status(400).send({reason: err.toString()});
		}
		else{res.end();}
	});
};
/*****DELETE Requests*****/ 
exports.removeSkill = function(req, res){
	Skill.findByIdAndRemove({'_id':req.params.id}, function(err){
		if(err){
			return res.status(400).send({reason:err.toString()});
		} else {res.end()};
	});
};