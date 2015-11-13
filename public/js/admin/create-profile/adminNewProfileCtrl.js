app.controller('adminNewProfileCtrl', function($scope, $timeout, dataService) {
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
		
		if (index === 'welcome')
			$scope.backupNotifications[index] = $scope.welcomeMessage.message.slice();
		else if (index !== 'new')
			$scope.backupNotifications[index] = $scope.notifications[index].message.slice();
	};
	
	$scope.cancelEdit = function(index) {
		$scope.editModeList[index] = false;
		
		if (index === 'new')
			$scope.newMessage = '';
		else if (index === 'welcome')
			$scope.welcomeMessage.message = $scope.backupNotifications[index].slice();
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
							$scope.newMessage = '';
						});
				});
			
			$scope.editModeList[note] = false;
		} else {
			dataService.updateNotification(note._id, {
				message: note.message
			});
			if (index)
				$scope.editModeList[index] = false;
			else
				$scope.editModeList['welcome'] = false;
		}
	};
});