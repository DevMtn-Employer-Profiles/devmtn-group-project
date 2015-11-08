angular.module('MainApp').controller('listCtrl', function($scope, dataService) {
	$scope.profiles = [];	
	var getAllCompanies = function() {
		dataService.getActiveCompanies().then(function(resp) {
			$scope.profiles = resp;
		});		
	}
	
	getAllCompanies();
	
	$scope.search = function(company) {
		return (angular.lowercase(company.companyName).indexOf(angular.lowercase($scope.query) || '') !== -1);
	};
});