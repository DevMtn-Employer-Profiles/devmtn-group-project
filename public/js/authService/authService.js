angular.module('MainApp').service('authService', function($http, $q, $state) {

	var simpleLoginReturn = function(result) {
		return result.data;
	}
	
	var loginErrorHandler = function(error) {
		if(error.status === 401) {
			//unauthorized
			$state.go('Landing');
		} else {
			console.error(error);
		}
	}
	
	this.getCurrentUser = function(forceRedirect) {
		return $http({
			method: 'GET',
			url: '/auth/currentUser'
		}).then(simpleLoginReturn, function(error) {
			if(error.status === 401) {
				//unauthorized
				console.error("Unauthorized");
				if(forceRedirect) {
					$state.go('Landing');
				}
			} else {
				console.error(error);
			}
		});
	}
	
	this.login = function() {
		return $http({
			method: 'GET',
			url: '/auth/devmtn'
		}).then(simpleLoginReturn, loginErrorHandler);
	}
	
	this.logout = function() {
		//logout on server
		return $http({
			method: 'GET',
			url: '/auth/logout'
		});
	}
});