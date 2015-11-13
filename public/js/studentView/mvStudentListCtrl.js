angular.module('MainApp').controller('mvStudentListCtrl', function($scope, $mdDialog, ModalService, dataService) {
	$scope.profiles = [];	
	/*Get all companies */(function() {
		dataService.getAllCompanies().then(function(res) {
			$scope.profiles = res;
		});		
	})();
	
	
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