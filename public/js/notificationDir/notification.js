angular.module('MainApp').directive('notification', function() {
	return {
		restrict: 'E',
		template: "<div class='notification-container'><p class='notification-date'>{{note.postDate | date: fullDate}}</p><p class='notification-message'>{{note.message}}</p></div>",
	};
});