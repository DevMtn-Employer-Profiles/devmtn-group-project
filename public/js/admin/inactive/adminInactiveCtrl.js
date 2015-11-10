app.controller('adminInactiveCtrl', function($scope, $timeout, $mdDialog, ModalService, dataService) {
	$scope.inactiveList = [];
	
	function getInactiveCompanies() {
		dataService.getInactiveCompanies()
			.then(function(result) {
				$scope.inactiveList = result; 
			});
	};
	
	getInactiveCompanies();
	
	$scope.search = function(company) {
		return (angular.lowercase(company.companyName).indexOf(angular.lowercase($scope.query) || '') !== -1);
	};
	
	$scope.deleteCompany = function(company) {
		var index = $scope.inactiveList.indexOf(company);
		
		dataService.deleteCompany($scope.inactiveList[index].id)
			.then(function(result) {
				$scope.inactiveList.splice(index, 1);
			});
	};
	
	$scope.updateStatus = function(company) {
		var index = $scope.inactiveList.indexOf(company);
		
		$timeout(function() {
			dataService.updateProfile($scope.inactiveList[index]);
		}, 50);
	};
	
	$scope.openProfile = function(event, profileId) {
		ModalService.currentProfileId = profileId;
		 
		$mdDialog.show({
			controller: 'ModalController',
			templateUrl: 'js/modal/modal.html',
			parent: angular.element(document.body),
			targetEvent: event,
			clickOutsideToClose: true
		});
	};
	
	$scope.$watch(function() {
		return ModalService.ModalSaveConfirmed
	}, function(newValue) {
		getInactiveCompanies();
	});
});