angular.module('MainApp').directive('siteHeader', function() {
	return {
		restrict: 'E',
		templateUrl: 'js/header/headerTemplate.html',
		controller: function($scope, $location) {
			$scope.loginEmployer = function() {
				$location.path('/login/employer');
			}
			
			$scope.loginStudent = function() {
				window.location.href = 'profiles.devmounta.in';
			}
		}
	}
})