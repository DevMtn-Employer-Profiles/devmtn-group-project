angular.module('MainApp').controller('employerCtrl', function($scope, $location, $timeout, $state, MobileService) {
	if ($location.path() === '/employer')
		$state.go('Employer.Home');
	// Sidenav Toolbar configuration from here on down
	$scope.isExpanded = true;
	$scope.toggleSidenav = function() {
		if ($scope.isExpanded) {
			$scope.isExpanded = false;
				
		} else {
			$scope.isExpanded = true;
		};
	};
	
	function activateTab() {
		$scope.activeTab = {
			all: 		false,
			active: 	false,
			inactive: 	false,
			pending: 	false,
			skills: 	false,
			config: 	false
		};
		
		var tab = parsePath();
		
		switch(tab)
		{
			case 'home'	   : $scope.activeTab.home = true;  	break;
			case 'profile' : $scope.activeTab.profile = true;	break;
			case 'students': $scope.activeTab.students = true;	break;
			default		   : $scope.activeTab.active = true;	break;
		}
	};
	
	activateTab();
	
	
	
	//  This is designed to figure out if the browser is on a mobile device ONLY,
	//  to allow me to ensure that it will be styled for that ONLY
	$scope.isMobile = MobileService.isMobile;
	
	
	
	// GENERIC FUNCTIONS TO BE ABLE TO GRAB/MANIPULATE DATA AS WE'D LIKE
	
	function parsePath() {
		var reversePath = reverseString($location.path()),
			removeFromFirstSlash = deleteFrom(reversePath, reversePath.indexOf('/')),
			restoredPath = reverseString(removeFromFirstSlash);
		
		return restoredPath;
	}
	
	function deleteFrom(str, index) {
		var newString = '';
		
		for (var i = 0; i < index; i++) {
			newString += str[i];
		}
		
		return newString;
	}
	
	function reverseString(str) {
		var reverseStr = '';
		
		for (var i = str.length - 1; i >= 0; i--) {
			reverseStr += str[i];
		}
		
		return reverseStr;
	}
	
	$scope.$watch(function() {
		return $location.path();
	}, function(newValue) {
		activateTab();
	});
});