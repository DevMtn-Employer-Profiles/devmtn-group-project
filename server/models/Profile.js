var mongoose = require('mongoose'),
	skills = require('./Skill.js');

var schema = new mongoose.Schema({
	logo: {type: String, default: 'http://www.factfiend.com/wp-content/uploads/2014/10/windows-logo.png'},
	companyName: {type: String, required: '{PATH} is required', unique: true},
	userId: {type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true},
	bio: {type: String},
	jobPostings: {type: [{type: String}], default: []},
	skills: {type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Skill'}], default: []},
	relocation: {type: Boolean},
	contactEmail: {type: [{type:String}], default: []},
	isVisible: {type: Boolean, default: false},
	isPending: {type: Boolean, default: true},
	studentMatches: {type: [], default: []}
});

module.exports = mongoose.model('Profile', schema);