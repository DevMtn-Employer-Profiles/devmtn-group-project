angular.module('MainApp').controller('employerStudentCtrl', function(dataService, $scope, $location) {
	$scope.showMatches = false;
	var myProfile;
	//Check profile
	dataService.getMyProfile().then(function(profile) {
		console.log("FOUND: ", profile);
		if(profile && profile.studentMatches && profile.studentMatches.length > 0) {
			$scope.showMatches = true;
			myProfile = profile;
		} else {
			$scope.showMatches = false;
			myProfile = null;
		}
	})
	
	$scope.viewMatches = function() {
		if($scope.showMatches) {
			console.log("profile: ", myProfile);
			console.log("PROGRAM ME!", myProfile._id);
			window.open('http://localhost:3000/#/myMatches/'+myProfile._id);
		}
	}
	
	$scope.viewAll = function() {
		window.open('http://profiles.devmounta.in/#/portfolioview', '_blank');
	}
})