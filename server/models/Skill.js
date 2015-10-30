var mongoose = require('mongoose');

var schema = mongoose.Schema({
	name: {type: String, required: true, unique: true, trim: true},
	created_on: {type: Date}
})

schema.pre('save', function(next) {
	this.created_on = Date.now();
	next();
});

module.exports = mongoose.model('Skills', schema);