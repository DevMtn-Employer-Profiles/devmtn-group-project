app.controller('ModalController', function($scope, $mdDialog, ModalService, dataService) {
	$scope.currentProfile = {};
	
	function getReferencedProfile() {
		dataService.getCompanyById(ModalService.currentProfileId)
			.then(function(result) {
				$scope.currentProfile = result;
			});
	}
	
	getReferencedProfile();
	
	$scope.hide = function() {
		$mdDialog.hide();
	};
	
	$scope.cancel = function() {
		$mdDialog.cancel();
	};
	
	$scope.saveProfile = function(answer) {
		$mdDialog.hide(answer);
	};
});