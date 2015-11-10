angular.module('MainApp').directive('siteHeader', function() {
	return {
		restrict: 'E',
		templateUrl: 'js/header/headerTemplate.html',
		controller: function($scope, $http, authService) {
			$scope.login = function() {
				$http({
					method: 'GET',
					url: '/auth/devmtn'
				}).then(function(result) {
					console.log("SUCCESS", result);
				}, function(error) {
					console.error(error);
				})
			}
			
			var getAuth = function() {
				authService.getCurrentUser()
					.then(function(res) {
						$scope.loggedIn = true;
					}, function(err) {
						$scope.loggedIn = false;
					});
			}
			
			getAuth();
		}
	}
})