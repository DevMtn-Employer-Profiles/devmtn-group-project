var mongoose = require('mongoose'),
	skills = require('./Skill.js');

var schema = new mongoose.Schema({
	logo: {type: String, default: 'http://www.factfiend.com/wp-content/uploads/2014/10/windows-logo.png'},
	companyName: {type: String, unique: true},
	userId: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
	bio: {type: String},
	jobPostings: {type: [{type: String}]},
	skills: {type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Skill'}]},
	relocation: {type: Boolean},
	contactEmails: {type: [{type:String}]},
	website: {type: String, default: ''},
	acceptRequestSent: Boolean
});

module.exports = mongoose.model('PendingProfile', schema);