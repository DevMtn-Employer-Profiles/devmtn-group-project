app.controller('adminConfigCtrl', function($scope, $timeout, dataService) {
	$scope.editModeList = [];
	
	$scope.notifications = [];
	$scope.backupNotifications = [];
	
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
		
		if (index !== 'new')
			$scope.backupNotifications[index] = $scope.notifications[index].message.slice();
	};
	
	$scope.cancelEdit = function(index) {
		$scope.editModeList[index] = false;
		
		if (index === 'new')
			$scope.newMessage = '';
		else
			$scope.notifications[index].message = $scope.backupNotifications[index].slice();
	};
	
	$scope.saveChanges = function(note, index) {
		if (note === 'new') {
			dataService.addNotification($scope.newMessage)
				.then(function() {
					dataService.getNotifications()
						.then(function(result) {
							result.splice(0, 1);
							$scope.notifications = result;
						});
				});
		} else {
			dataService.updateNotification(note._id, {
				message: note.message
			});
			
			$scope.editModeList[index] = false;
		}
	};
});