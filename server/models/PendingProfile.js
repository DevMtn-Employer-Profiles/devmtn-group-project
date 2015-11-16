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
	contactEmails: {type: [{type:String}], default: []},
	submit: {type: Boolean, default: false},
	studentMatches: {type: [], default: []},
	website: {type: String, default: ''}
});

module.exports = mongoose.model('PendingProfile', schema);