app.controller('adminCtrl', function($scope, $timeout, $state, $location) {
	var isExpanded = true;
	
	
	if ($location.path() === '/admin')
		$state.go('Admin.Active');
	
	
	// Sidenav Toolbar configuration from here on down
	$scope.toggleSidenav = function() {
		if (isExpanded) {
			isExpanded = false;
			
			angular.element('.sidenav-toolbar')
				.css({
					'width': '85px'
				});
			
			angular.element('.open-expand')
				.addClass('hidden');
				
		} else {
			isExpanded = true;
			
			angular.element('.sidenav-toolbar')
				.css({
					'width': '200px'
				});
			
			$timeout(function(){
				if (isExpanded)
					angular.element('.open-expand')
						.removeClass('hidden');
			}, 285);
		};
	};
	
	$scope.activeTab = function() {
		angular.element('.toolbar-button')
			.removeClass('active-tab');
		
		$timeout(function() {
			var tab = parsePath();
			
			switch(tab)
			{
				case 'active'  : angular.element('#active').addClass('active-tab');   break;
				case 'inactive': angular.element('#inactive').addClass('active-tab'); break;
				case 'pending' : angular.element('#pending').addClass('active-tab');  break;
				case 'skills'  : angular.element('#skills').addClass('active-tab');   break;
				default		   : angular.element('#active').addClass('active-tab');   break;
			}
		}, 50);
	};
	
	$scope.activeTab();
	
	
	
	//  This is designed to figure out if the browser is on a mobile device ONLY,
	//  to allow me to ensure that it will be styled for that ONLY
	var isMobile = {
		Android: function() {
			return navigator.userAgent.match(/Android/i);
		},
		
		BlackBerry: function() {
			return navigator.userAgent.match(/BlackBerry/i);
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
			return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		}
	}
	
	
	
	// GENERIC FUNCTIONS TO BE ABLE TO GRAB/MANIPULATE DATA AS WE'D LIKE
	
	
	function initialSetup() {
		if (isMobile.any()) {
			angular.element('.sidenav-toolbar')
				.css({
					width: '85px'
				});
			
			angular.element('#toggle-menu-button')
				.addClass('hidden');
			
			$timeout(function() {
				angular.element('.open-expand')
					.addClass('hidden');
				}, 25);
		}
		
		angular.element('.route-container')
			.css({
				height: window.innerHeight - 86,
				"max-height": window.innerHeight - 86
			});
	}
	
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
	
	initialSetup();
	
	$scope.$watch(function() {
		return window.innerHeight;
	}, function(newValue) {
		angular.element('.route-container')
			.css({
				height: newValue - 86
			});
	});
	
	$scope.$watch(function() {
		return window.innerWidth;
	}, function(newValue) {
		angular.element('.route-container')
			.css({
				width: newValue
			});
	});
});