angular.module('MainApp').controller('employerHomeCtrl', function($scope, dataService){
	$scope.myProfile = {};
	$scope.notifications = [];
	$scope.status = '';
	$scope.welcomeMessage = 'Thanks for taking interest in DevMountain and our students, we work hard to challenge our students to become great developers who you would want to hire. Please take a moment to build your profile. By building a profile we can help you find students who can fill the needs of your company.';
	
	dataService.getMyProfile().then(function(result) {
		$scope.myProfile = result;
		//Determine profile status
		if(result.isPending) {
			if(result.isActive) {
				//CRAP! SOMETHING BROKE!
				console.error('BOTH PROFILE STATUS BOOLS CAN NEVER BE THE SAME');
			} else {
				$scope.status = 'Your profile is under reviewed.';
			}
		} else {
			if(result.isActive) {
				$scope.status = 'Your profile is active!';
			} else {
				$scope.status = 'Your profile is currently inactive. To activate your profile, go to the profile tab and update your profile information.';
			}
		}
	});
	
	dataService.getNotifications().then(function(result) {
		console.log(result);
		if(!Array.isArray(result)) {
			result = [result];
		}
		$scope.notifications = result;
	});
});
