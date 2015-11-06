app.controller('adminInactiveCtrl', function($scope, $timeout, dataService) {
	$scope.inactiveList = [];
	
	$scope.getInactiveCompanies = function() {
		dataService.getInactiveCompanies()
			.then(function(result) {
				$scope.inactiveList = result; 
			});
	};
	
	$scope.getInactiveCompanies();
	
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
});