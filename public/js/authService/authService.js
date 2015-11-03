angular.module('MainApp').service('authService', function($http) {
	
	var simpleDataReturn = function(result) {
		return result.data;
	}
	
	var handleError = function(error) {
		console.error(error);
	}
	
	this.tryLogin = function() {
		return $http({
			method: 'POST',
			url: '/api/auth/local'
		}).then(simpleDataReturn, handleError);
	}
	
	this.trySignup = function(signupData) {
		return $http({
			method: 'POST',
			url: '/api/auth/signup',
			data: signupData
		});
	}
});