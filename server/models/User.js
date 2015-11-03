var mongoose = require('mongoose');

var schema = mongoose.Schema({
	email: {type: String},
	password: {type: String}
});