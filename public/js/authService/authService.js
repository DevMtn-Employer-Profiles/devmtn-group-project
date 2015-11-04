angular.module('MainApp').service('authService', function($http, $q) {

	var simpleLoginReturn = function(result) {
		//save user to local storage
		localStorage.setItem('devmtnUser', result);
		return result.data;
	}
	
	var loginErrorHandler = function(error) {
		console.error(error);
	}
	
	//This feels a little buggy, probably won't work --Tim
	this.getCurrentUser = function() {
		var dfd = $q.defer();
		//check local storage
		var user = localStorage.getItem('devmtnUser');
		if(user)
			dfd.resolve(user);
		//check server
		$http({
			method: 'GET',
			url: '/auth/currentUser'
		}).then(function(result) {
			dfd.resolve(result);
		}, function(err) {
			dfd.resolve(err, null);
		});
		return dfd.promise;
	}
	
	this.login = function() {
		return $http({
			method: 'GET',
			url: '/api/auth/devmtn'
		}).then(simpleLoginReturn, loginErrorHandler);
	}
	
	this.logout = function() {
		//clear from localstorage
		localStorage.removeItem('devmtnUser');
		//logout on server
		$http({
			method: 'GET',
			url: '/auth/logout'
		})
	}
});