var mongoose = require('mongoose'),
	skills = require('./Skill.js');

var schema = new mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	logo: String,
	companyName: String,
	userId: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
	bio: String,
	jobPostings: {type: [{type: String}]},
	skills: {type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Skill'}]},
	relocation: Boolean,
	contactEmails: {type: [{type:String}]},
	website: String,
	submit: {type: Boolean, default: false}
});

module.exports = mongoose.model('PendingProfile', schema);