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
		//check local storage for the current user
		var user = localStorage.getItem('devmtnUser');
		if(user)
			dfd.resolve(user);
		//check server for the current user
		$http({
			method: 'GET',
			url: '/auth/currentUser'
		}).then(function(result) {
			//found a current user
			dfd.resolve(result);
		}, function(err) {
			//user does not find anyone as being logged in
			dfd.resolve(err, null);
		});
		return dfd.promise;
	}
	
	this.login = function() {
		return $http({
			method: 'GET',
			url: '/auth/devmtn'
		}).then(function(success){console.log("SUCCESS", success)}, function(err){console.error('ERROR',err)});
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