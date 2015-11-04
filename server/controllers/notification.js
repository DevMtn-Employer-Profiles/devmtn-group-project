var Notification = require('mongoose').model('Notification');
/*****GET Requests*****/ 
exports.getNotifications = function(req, res) {
	Notification.find({}).exec(function(err, collection) {
		if(err){
			res.status(500).send(err);
		} else {
			res.json(collection);
		}
	});
}

/*****POST Requests*****/ 
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

/*****DELETE Requests*****/ 
exports.deleteNotification = function(req, res) {
	Notification.remove({_id: req.params.id}, function(err, result) {
		if(err) {
			res.status(500).send(err);
		} else {
			res.json(result);
		}
	})
}

exports.updateNotification = function(req, res) {
	Notification.findByIdAndUpdate(req.params.id, req.body)
		.exec(function(err, change) {
			if (err)
				return res.send(err);
			
			res.json(change);
		});
};