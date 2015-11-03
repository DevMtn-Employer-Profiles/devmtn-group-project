var mongoose = require('mongoose'),
	skills = require('./Skill.js');

var schema = new mongoose.Schema({
	companyName: {type: String, required: '{PATH} is required', unique: true},
	bio: {type: String},
	requirements: [{type: String}],
	logo: {type: String, default: 'http://www.factfiend.com/wp-content/uploads/2014/10/windows-logo.png'},
	skills: {type: [{type: mongoose.Schema.Types.ObjectId, ref: 'skills'}], default: []},
	isPending: {type: Boolean, default: false},
	isActive: {type: Boolean, default: false}
});

module.exports = mongoose.model('Profile', schema);