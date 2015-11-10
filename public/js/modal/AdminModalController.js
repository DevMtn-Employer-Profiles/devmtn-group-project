app.controller('ModalController', function($scope, $location, $mdDialog, ModalService, MobileService, dataService) {
	$scope.currentProfile = {};
	
	(function getReferencedProfile() {
		dataService.getCompanyById(ModalService.currentProfileId)
			.then(function(result) {
				$scope.currentProfile = result;
			});
	})();
	
	var isAdmin = ($location.path().indexOf('admin') !== -1);
	
	$scope.hide = function() {
		$mdDialog.hide();
	};
	
	$scope.cancel = function() {
		$mdDialog.cancel();
	};
	
	$scope.saveProfile = function(answer) {
		if (isAdmin) {
			var confirm = $mdDialog.confirm()
								.title('Save changes to the profile for ' + angular.uppercase($scope.currentProfile.companyName) + '?')
								.ariaLabel('Save Profile')
								.targetEvent(event)
								.ok('Save')
								.cancel('Cancel');
			
			$mdDialog.show(confirm)
				.then(function() {
					dataService.updateProfile($scope.currentProfile);
					ModalService.ModalSaveConfirmed++;
				});
		}
	};
	
	$scope.deleteCompany = function(event, company) {
		if (isAdmin) {
			var confirm = $mdDialog.confirm()
								.title('Delete the profile for ' + angular.uppercase($scope.currentProfile.companyName) + '?')
								.ariaLabel('Delete Profile')
								.targetEvent(event)
								.ok('Delete')
								.cancel('Cancel');
			
			$mdDialog.show(confirm)
				.then(function() {
					dataService.deleteCompany($scope.currentProfile._id);
					ModalService.ModalSaveConfirmed--;
				});
		}
	};
	
	$scope.getAdmin = function() {
		return isAdmin;
	};
	
	$scope.isMobile = MobileService.isMobile;
});