app.controller('ModalController', function($scope, $mdDialog, ModalService, dataService) {
	$scope.currentProfile = {};
	
	(function getReferencedProfile() {
		dataService.getCompanyById(ModalService.currentProfileId)
			.then(function(result) {
				$scope.currentProfile = result;
			});
	})();
	
	$scope.hide = function() {
		$mdDialog.hide();
	};
	
	$scope.cancel = function() {
		$mdDialog.cancel();
	};
	
	$scope.saveProfile = function(answer) {
		var confirm = $mdDialog.confirm()
							.title('Save changes to the profile for ' + angular.uppercase($scope.currentProfile.companyName) + '?')
							.ariaLabel('Save Profile')
							.targetEvent(event)
							.ok('Save')
							.cancel('Cancel');
		
		$mdDialog.show(confirm)
			.then(function() {
				dataService.updateProfile($scope.currentProfile);
			});
	};
	
	$scope.delete = function() {
		var confirm = $mdDialog.confirm()
							.title('Delete the profile for ' + angular.uppercase($scope.currentProfile.companyName) + '?')
							.ariaLabel('Delete Profile')
							.targetEvent(event)
							.ok('Delete')
							.cancel('Cancel');
		
		$mdDialog.show(confirm)
			.then(function() {
				dataService.deleteProfile($scope.currentProfile._id);
			});
	};
});