angular.module('MainApp').controller('listCtrl', function($scope, $mdDialog, ModalService, dataService) {
	$scope.profiles = [];	
	var getAllCompanies = function() {
		dataService.getActiveCompanies().then(function(resp) {
			$scope.profiles = resp;
		});		
	}
	
	getAllCompanies();
	
	$scope.search = function(company) {
		return (angular.lowercase(company.companyName).indexOf(($scope.query) || '') !== -1);
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
});