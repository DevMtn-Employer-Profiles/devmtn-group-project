angular.module('MainApp').controller('listCtrl', function($scope, dataService) {
	
	$scope.getAllCompanies = function() {
		dataService.getAllCompanies().then(function(resp) {
			$scope.companies = resp;
		});		
	}
	
});