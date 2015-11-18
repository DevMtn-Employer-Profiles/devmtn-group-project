angular.module('MainApp').controller('employerStudentCtrl', function(dataService, $scope, $location) {
	$scope.showMatches = false;
	//Check profile
	dataService.getMyProfile().then(function(profile) {
		if(profile && profile.studentMatches && profile.studentMatches.length > 0) {
			$scope.showMatches = true;
		} else {
			$scope.showMatches = false;
		}
	})
	
	$scope.viewMatches = function() {
		if($scope.showMatches) {
			console.log("PROGRAM ME!");
		}
	}
	
	$scope.viewAll = function() {
		window.open('http://profiles.devmounta.in/#/portfolioview', '_blank');
	}
})