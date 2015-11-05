angular.module('MainApp').directive('siteHeader', function() {
	return {
		restrict: 'E',
		templateUrl: 'js/header/headerTemplate.html',
		controller: function($scope, $http) {
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
		}
	}
})