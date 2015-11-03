angular.module('MainApp').controller('loginCtrl', function($scope, authService) {
	$scope.tryLogin = function() {
		console.log("Logging In");
		authService.tryLogin().then(function(result) {
			//authentication passed. Find who logged in
			//and redirect to proper page. Admin to Admin, 
			//Employer to Employer, Students get redirected.
		}, function(error) {
			//authentication failed
		});
	}
	
	$scope.trySignup = function() {
		console.log("Logging Out");
		//Verify password match
		if($scope.signupPassword === $scope.confirmPassword) {
			var signupObject = {
				email: $scope.signupEmail,
				password: $scope.signupPassword
			};
			authService.trySignup(signupObject).then(function(result) {
				//signup success
			}, function(error) {
				//signup failure
			});
		} else {
			//Confirm Password Failed
		}
	}
})