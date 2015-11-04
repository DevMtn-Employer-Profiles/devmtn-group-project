app.controller('adminAllCtrl', function($scope, $timeout, dataService) {
	$scope.companyList = [];
	
	$scope.search = function(company) {
		return (angular.lowercase(company.companyName).indexOf(angular.lowercase($scope.query) || '') !== -1);
	};
	
	(function getAllCompanies() {
		dataService.getAllCompanies()
			.then(function(response) {
				$scope.companyList = response;
			});
	})();
	
	$scope.deleteCompany = function(company) {
		var index = $scope.companyList.indexOf(company);
		
		dataService.deleteCompany($scope.companyList[index]._id)
			.then(function(result) {
				$scope.companyList.splice(index, 1);
			});
		
		// $scope.companyList.splice(index, 1);
	};
	
	$scope.updateCompany = function(company) {
		var index = $scope.companyList.indexOf(company);
		$timeout(function() {
			dataService.updateProfile($scope.companyList[index]);
		}, 50);
	};
});