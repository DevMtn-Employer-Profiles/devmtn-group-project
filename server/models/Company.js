var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	users: {type: [{type: mongoose.Schema.Types.ObjectId}]},
	company_name: {type: String},
	bio: {type: String},
	facts: {type: [{type: String}]},
	skills: {type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Skills'}]}
});

module.exports = mongoose.model('Company', schema);
