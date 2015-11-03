var Notification = require('mongoose').model('Notification');

exports.getNotifications = function(req, res) {
	Notification.find({}).exec(function(err, collection) {
		if(err){
			res.status(500).send(err);
		} else {
			res.json(collection);
		}
	});
}

exports.deleteNotification = function(req, res) {
	Notification.remove({_id: req.params.id}, function(err, result) {
		if(err) {
			res.status(500).send(err);
		} else {
			res.json(result);
		}
	})
}

exports.addNotification = function(req, res) {
	var note = {
		message: req.body.message,
		postDate: Date.now()
	};
	Notification.create(note, function(err, result) {
		if(err) {
			res.status(500).send(err);
		} else {
			res.json(result);
		}
	})
}