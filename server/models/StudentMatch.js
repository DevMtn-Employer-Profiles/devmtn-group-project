var mongoose = require('mongoose');

var studentMatchSchema = new mongoose.Schema({
	student: {
		type: String
	},
	expirationDate: {
		type: Date
	},
	employerId: {
		type: mongoose.Scheme.Types.ObjectId,
		ref: 'User'
	}
});

module.exports = mongoose.model('StudentMatch', studentMatchSchema);