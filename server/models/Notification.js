var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	message: {type: String},
	postDate: {type: Date}
});

module.exports = mongoose.model('Notification', schema);