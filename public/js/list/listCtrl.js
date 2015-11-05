angular.module('MainApp').controller('listCtrl', function($scope, dataService) {
	$scope.profiles = [];	
	var getAllCompanies = function() {
		dataService.getActiveCompanies().then(function(resp) {
			console.log("Got Active: ", resp);
			$scope.profiles = resp;
		});		
	}
	
	getAllCompanies();
});