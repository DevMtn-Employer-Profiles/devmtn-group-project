app.controller('adminPendingCtrl', function($scope, $timeout, dataService) {
	$scope.pendingList = [];
	
	$scope.search = function(company) {
		return (angular.lowercase(company.companyName).indexOf(angular.lowercase($scope.query) || '') !== -1);
	};
	
	(function getPendingCompanies() {
		dataService.getPendingCompanies()
			.then(function(response) {
				$scope.pendingList = response;
			});
	})();
	
	$scope.updateStatus = function(company) {
		var index = $scope.pendingList.indexOf(company);
		
		$timeout(function() {
			dataService.updateProfile($scope.pendingList[index]);
		}, 50);
	};
});