app.controller('ModalController', function($scope, $mdDialog, ModalService, dataService) {
	$scope.currentProfile = {};
	
	(function getReferencedProfile() {
		dataService.getCompanyById(ModalService.currentProfileId)
			.then(function(result) {
				$scope.currentProfile = result;
				console.log(result);
				// $scope.currentProfile.skills.forEach(function(element, index) {
				// 	dataService.getSkillById(element)
				// 		.then(function(result) {
				// 			$scope.currentProfile.skills[index] = result;
				// 			console.log($scope.currentProfile.skills);
				// 		});
				// });
			});
	})();
	
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