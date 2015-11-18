app.controller('ModalController', function($scope, $location, $mdDialog, ModalService, MobileService, dataService) {
	$scope.currentProfile = {};
	
	(function getReferencedProfile() {
		dataService.getCompanyById(ModalService.currentProfileId)
			.then(function(result) {
				$scope.currentProfile = result;
				$scope.isEditing = false;
				
				if (result.isPending) {
					$scope.changeObj = {};
					
					for (var key in result.pendingProfile) {
						if (JSON.stringify(result.pendingProfile[key]) !== JSON.stringify(result[key]) && key !== 'submit') {
							$scope.changeObj[key] = true;
						}
					}
				}
			});
	})();
	
	$scope.path = $location.path();
	$scope.compareChanges = false;
	
	var isAdmin = ($location.path().indexOf('admin') !== -1);
	
	$scope.hide = function() {
		$scope.cancel();
	};
	
	$scope.cancel = function() {
		if ($scope.isEditing) {
			$scope.isEditing = false;
		} else if ($scope.compareChanges) {
			$scope.compareChanges = false;
		} else {
			$mdDialog.cancel();
		}
	};
	
	$scope.beginEdit = function() {
		$scope.isEditing = true;
	};
	
	$scope.showChanges = function() {
		$scope.compareChanges = true;
	};
	
	$scope.saveProfile = function(answer) {
		if (isAdmin) {
			var confirm = $mdDialog.confirm()
								.title('Save changes to the profile for ' + 
										angular.uppercase($scope.currentProfile.companyName) + '?')
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
								.title('Delete the profile for ' + 
										angular.uppercase($scope.currentProfile.companyName) + '?')
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
	
	function parsePath() {
		var reversePath = reverseString($location.path()),
			removeFromFirstSlash = deleteFrom(reversePath, reversePath.indexOf('/')),
			restoredPath = reverseString(removeFromFirstSlash);
		
		return restoredPath;
	}
	
	function deleteFrom(str, index) {
		var newString = '';
		
		for (var i = 0; i < index; i++) {
			newString += str[i];
		}
		
		return newString;
	}
	
	function reverseString(str) {
		var reverseStr = '';
		
		for (var i = str.length - 1; i >= 0; i--) {
			reverseStr += str[i];
		}
		
		return reverseStr;
	}
});