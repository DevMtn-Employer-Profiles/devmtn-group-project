var mongoose = require('mongoose'),
	skills = require('./Skill.js');

var schema = new mongoose.Schema({
	logo: {type: String, default: ''},
	companyName: {type: String, required: '{PATH} is required', unique: true},
	userId: {type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true},
	bio: {type: String},
	jobPostings: {type: [{type: String}], default: []},
	skills: {type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Skill'}], default: []},
	relocation: {type: Boolean},
	contactEmails: {type: [{type:String}], default: []},
	isVisible: {type: Boolean, default: false},
	pendingProfile: {type: mongoose.Schema.Types.ObjectId, ref: 'PendingProfile'},
	isPending: {type: Boolean, default: false},
	studentMatches: {type: [], default: []},
	website: {type: String, default: ''}
});

module.exports = mongoose.model('Profile', schema);