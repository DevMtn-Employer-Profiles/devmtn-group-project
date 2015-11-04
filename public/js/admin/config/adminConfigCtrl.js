app.controller('adminConfigCtrl', function($scope, dataService) {
	
	$scope.notifications = [];
	
	(function getNotifications() {
		dataService.getNotifications()
			.then(function(result) {
				$scope.notifications = result;
				console.log(result);
				$scope.welcomeMessage = $scope.notifications.splice(0, 1)[0].message;
				console.log($scope.welcomeMessage);
			});
	})();
	
	
	$scope.deleteNotification = function(index) {
		dataService.deleteNotification($scope.notifications[index]._id);
		
		$scope.notifications.splice(index, 1);
	};
});