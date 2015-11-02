var mongoose = require('mongoose'),
	skills = require('./Skill.js');

var schema = new mongoose.Schema({
	companyName: {type: String, required: '{PATH} is required', unique: true},
	bio: {type: String},
	facts: [{type: String}],
	roles: [String],
	skills: [{type: mongoose.Schema.Types.ObjectId, ref: 'skills'}]
});

module.exports = mongoose.model('Profile', schema);