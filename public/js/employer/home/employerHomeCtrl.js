angular.module('MainApp').controller('employerHomeCtrl', function($scope, $state, dataService){
	$scope.myProfile = {};
	$scope.notifications = [];
	$scope.status = '';
	$scope.defaultWelcomeMessage = 'Thanks for taking interest in DevMountain and our students, we work hard to challenge our students to become great developers who you would want to hire. Please take a moment to build your profile. By building a profile we can help you find students who can fill the needs of your company.';
	
	dataService.getMyProfile().then(function(result) {
		$scope.myProfile = result;
		console.log("RESULT: ", result);
		//Determine profile status
		if(result.isPending) {
			if(result.isVisible) {
				//CRAP! SOMETHING BROKE!
				$scope.status = 'We have flagged your profile changes to be reviewed, your profile is still visible in the meantime.';
			} else {
				$scope.status = 'Your profile is under review.';
			}
		} else {
			if(result.isVisible) {
				$scope.status = 'Your profile is active!';
			} else {
				$scope.status = 'Your profile is currently inactive. To activate your profile, go to the profile tab and submit your profile for approval.';
			}
		}
	});
	
	dataService.getNotifications().then(function(result) {
		//Pull out welcome message from first notification
		$scope.welcomeMessage = result.splice(0,1)[0].message;
		$scope.notifications = result;
	});
});
