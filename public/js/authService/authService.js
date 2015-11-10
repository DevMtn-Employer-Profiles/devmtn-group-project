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
		var deferred = $q.defer();

		//check server for the current user
		$http({
			method: 'GET',
			url: '/auth/currentUser'
		})
			.then(function(response) {
				deferred.resolve(response.data);
			});
		
		return deferred.promise;
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