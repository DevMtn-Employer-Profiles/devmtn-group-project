app.controller('adminPendingCtrl', function($scope, $timeout, $mdDialog, ModalService, dataService) {
	$scope.pendingList = [];
	
	$scope.search = function(company) {
		return (angular.lowercase(company.companyName).indexOf(angular.lowercase($scope.query) || '') !== -1);
	};
	
	function getPendingCompanies() {
		dataService.getPendingCompanies()
			.then(function(response) {
				$scope.pendingList = response;
			});
	};
	
	getPendingCompanies();
	
	$scope.updateStatus = function(company) {
		var index = $scope.pendingList.indexOf(company);
		
		$timeout(function() {
			dataService.updateProfile($scope.pendingList[index]);
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
		getPendingCompanies();
	});
});