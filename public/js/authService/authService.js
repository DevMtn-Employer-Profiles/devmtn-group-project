angular.module('MainApp').service('authService', function($http) {
	
	var simpleDataReturn = function(result) {
		return result.data;
	}
	
	var handleError = function(error) {
		console.error(error);
	}
	
	this.login = function() {
		return $http({
			method: 'POST',
			url: '/api/auth/devmtn'
		}).then(simpleDataReturn, handleError);
	}
	
	// this.trySignup = function(signupData) {
	// 	return $http({
	// 		method: 'POST',
	// 		url: '/api/auth/signup',
	// 		data: signupData
	// 	});
	// }
});