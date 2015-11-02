var mongoose = require('mongoose');

var schema = mongoose.Schema({
	name: {type: String, required: true, unique: true, trim: true},
	created_on: {type: Date}
});

module.exports = mongoose.model('Skill', schema);