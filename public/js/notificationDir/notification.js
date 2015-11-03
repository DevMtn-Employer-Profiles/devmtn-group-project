angular.module('MainApp').directive('notification', function() {
	return {
		restrict: 'E',
		template: '<div><p>{{note.postDate}}</p><p>{{note.message}}</p></div>',
	};
})