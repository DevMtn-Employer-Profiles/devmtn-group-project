app.controller('adminConfigCtrl', function($scope, $timeout, dataService) {
	$scope.editModeList = [];
	
	$scope.notifications = [];
	
	(function getNotifications() {
		dataService.getNotifications()
			.then(function(result) {
				$scope.notifications = result;
				$scope.welcomeMessage = $scope.notifications.splice(0, 1)[0];
				
				for (var i = 0; i < $scope.notifications.length; i++)
					$scope.editModeList.push(false);
				
				$scope.editModeList.new = false;
				$scope.editModeList.welcome = false;
			});
	})();
	
	
	$scope.deleteNotification = function(index) {
		dataService.deleteNotification($scope.notifications[index]._id);
		
		$scope.notifications.splice(index, 1);
	};
	
	$scope.editModeOn = function(index) {
		$scope.editModeList[index] = true;
	};
	
	$scope.cancelEdit = function(index) {
		$scope.editModeList[index] = false;
		
		$scope.notifications
	};
	
	$scope.saveChanges = function(index) {
		if (index === 'new') {
			dataService.addNotification($scope.newMessage)
				.then(function() {
					dataService.getNotifications()
						.then(function(result) {
							$scope.notifications = result;
						});
				});
		} else {
			
		}
	};
});