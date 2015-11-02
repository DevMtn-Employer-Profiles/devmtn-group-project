app.controller('adminActiveCtrl', function($scope, dataService) {
	$scope.activeList = [];
	
	$scope.getActiveCompanies = function() {
		$scope.activeList = dataService.getActiveCompanies();
		console.log($scope.activeList);
	};
	
	$scope.getActiveCompanies();
});