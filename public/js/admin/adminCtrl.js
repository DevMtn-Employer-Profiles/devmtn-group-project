var scope

app.controller('adminCtrl', function($scope, $timeout, $state, $location) {
	if ($location.path() === '/admin')
		$state.go('Admin.All');
	
	$scope.isExpanded = true;
	
	$scope.activeTab = {
		all: false,
		active: false,
		inactive: false,
		pending: false,
		skills: false,
		config: false
	};
	
	
	// Sidenav Toolbar configuration from here on down
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
			case 'all' 	   : $scope.activeTab.all = true;   	break;
			case 'active'  : $scope.activeTab.active = true;	break;
			case 'inactive': $scope.activeTab.inactive = true;	break;
			case 'pending' : $scope.activeTab.pending = true;	break;
			case 'skills'  : $scope.activeTab.skills = true;	break;
			case 'config'  : $scope.activeTab.config = true;	break;
			default		   : $scope.activeTab.all = true;	break;
		}
	};
	
	activateTab();
	
	
	
	//  This is designed to figure out if the browser is on a mobile device ONLY,
	//  to allow me to ensure that it will be styled for that ONLY
	$scope.isMobile = {
		Android: function() {
			return navigator.userAgent.match(/Android/i);
		},
		
		BlackBerry: function() {
			return navigator.userAgent.match(/BlackBerry|BB10|Tablet|Mobile/i);
		},
		
		iOS: function() {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
		
		Opera: function() {
			return navigator.userAgent.match(/Opera Mini/i);
		},
		
		Windows: function() {
			return navigator.userAgent.match(/IEMobile|Edge/i);
		},
		
		any: function() {
			var isAny = ($scope.isMobile.Android() || $scope.isMobile.BlackBerry() || $scope.isMobile.iOS() || $scope.isMobile.Opera() || $scope.isMobile.Windows());
			return isAny;
		}
	}
	
	
	
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
	}, function(newVal) {
		activateTab();
	});
});