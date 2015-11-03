angular.module('MainApp').controller('listCtrl', function($scope, dataService) {
	
	$scope.getAllCompanies = function() {
		dataService.getActiveCompanies().then(function(resp) {
			$scope.profiles = resp;
		});		
	}
	
	$scope.getAllCompanies();
});