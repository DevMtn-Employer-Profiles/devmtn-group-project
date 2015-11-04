app.controller('adminActiveCtrl', function($scope, $timeout, dataService) {
	$scope.activeList = [];
	
	$scope.search = function(company) {
		return (angular.lowercase(company.companyName).indexOf(angular.lowercase($scope.query) || '') !== -1);
	}
	
	$scope.getActiveCompanies = function() {
		dataService.getActiveCompanies()
			.then(function(response) {
				$scope.activeList = response;
			});
	};
	
	$scope.getActiveCompanies();
	
	$scope.updateStatus = function(company) {
		var index = $scope.activeList.indexOf(company);
		
		$timeout(function() {
			dataService.updateProfile($scope.activeList[index]);
		}, 50);
	};
});