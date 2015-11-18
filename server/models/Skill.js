var mongoose = require('mongoose');

var schema = mongoose.Schema({
	name: {type: String, required: true, unique: true, trim: true},
	approved: {type: Boolean, default: false}
});

module.exports = mongoose.model('Skill', schema);