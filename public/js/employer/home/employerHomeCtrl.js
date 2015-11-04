angular.module('MainApp').controller('employerHomeCtrl', function($scope, $state, dataService){
	$scope.myProfile = {};
	$scope.notifications = [];
	$scope.status = '';
	$scope.defaultWelcomeMessage = 'Thanks for taking interest in DevMountain and our students, we work hard to challenge our students to become great developers who you would want to hire. Please take a moment to build your profile. By building a profile we can help you find students who can fill the needs of your company.';
	
	dataService.getMyProfile().then(function(result) {
		$scope.myProfile = result;
		try {
		//Determine profile status
			if(result.isPending) {
				if(result.isActive) {
					//CRAP! SOMETHING BROKE!
					console.error('BOTH PROFILE STATUS BOOLS CAN NEVER BE THE SAME');
					$scope.status = 'This is embarassing, it seems we have an error.';
				} else {
					$scope.status = 'Your profile is under review.';
				}
			} else {
				if(result.isActive) {
					$scope.status = 'Your profile is active!';
				} else {
					$scope.status = 'Your profile is currently inactive. To activate your profile, go to the profile tab and update your profile information.';
				}
			}
		} catch(e) {
			console.error("You are not currently logged in. Please log in before accessing this page.  Thank you!");
			// $state.go('Landing');
		}
	});
	
	dataService.getNotifications().then(function(result) {
		//Pull out welcome message from first notification
		$scope.welcomeMessage = result.splice(0,1)[0].message;
		$scope.notifications = result;
	});
});
