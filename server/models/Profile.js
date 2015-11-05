var mongoose = require('mongoose'),
	skills = require('./Skill.js');

var schema = new mongoose.Schema({
	companyName: {type: String, required: '{PATH} is required', unique: true},
	userId: {type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true},
	bio: {type: String},
	requirements: {type: [{type: String}], default: []},
	logo: {type: String, default: 'http://www.factfiend.com/wp-content/uploads/2014/10/windows-logo.png'},
	skills: {type: [{type: mongoose.Schema.Types.ObjectId, ref: 'skills'}], default: []},
	isPending: {type: Boolean, default: false},
	isVisible: {type: Boolean, default: false}
});

module.exports = mongoose.model('Profile', schema);