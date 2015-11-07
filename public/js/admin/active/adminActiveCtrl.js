app.controller('adminActiveCtrl', function($scope, $timeout, $mdDialog, ModalService, dataService) {
	$scope.activeList = [];
	
	$scope.search = function(company) {
		return (angular.lowercase(company.companyName).indexOf(angular.lowercase($scope.query) || '') !== -1);
	}
	
	function getActiveCompanies() {
		dataService.getActiveCompanies()
			.then(function(response) {
				$scope.activeList = response;
			});
	};
	
	getActiveCompanies();
	
	$scope.updateStatus = function(company) {
		var index = $scope.activeList.indexOf(company);
		
		$timeout(function() {
			dataService.updateProfile($scope.activeList[index]);
		}, 50);
	};
	
	$scope.openProfile = function(event, profileId) {
		ModalService.currentProfileId = profileId;
		 
		$mdDialog.show({
			controller: 'ModalController',
			templateUrl: 'js/admin/modal/modal.html',
			parent: angular.element(document.body),
			targetEvent: event,
			clickOutsideToClose: true
		});
	};
	
	$scope.$watch(function() {
		return ModalService.ModalSaveConfirmed
	}, function(newValue) {
		getActiveCompanies();
	});
});