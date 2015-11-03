angular.module('MainApp').controller('employerHomeCtrl', function($scope, dataService){
	$scope.notifications = [];
	$scope.welcomeMessage = 'Thanks for taking interest in DevMountain and our students,\
	we work hard to challenge our students to become great developers\
	who you would want to hire. Please take a moment to build your\
	profile. By building a profile we can help you find students\
	who can fill the needs of your company.';
	dataService.getNotifications().then(function(result) {
		console.log(result);
		if(!Array.isArray(result)) {
			result = [result];
		}
		$scope.notifications = result;
	});
});