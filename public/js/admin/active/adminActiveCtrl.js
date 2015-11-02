app.controller('adminActiveCtrl', function($scope, dataService) {
	$scope.dummyActiveList = [
		{
			companyName: 'Proctor & Gamble',
			emplCount: '18,000+',
			requestedSkills: ['Node.js', 'AngularJS', 'WebSQL'],
			bio: 'We are P&G',
			companyLogo: ''
		}
	];
	
	$scope.activeList = [];
	
	$scope.getActiveCompanies = function() {
		// $scope.activeList = dataService.getActiveCompanies();
		console.log($scope.activeList);
	};
	
	$scope.getActiveCompanies();
});