app.controller('adminCtrl', function($scope, $timeout, $state, $location) {
	var custIsExpanded = false;
	
	
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
	
	
	
	
	
	
	
	$state.go('Admin.Active');
	
	$scope.toggleSidenav = function() {
		if (!isMobile.any()) {
			if (custIsExpanded) {
				custIsExpanded = false;
				
				angular.element('.sidenav-toolbar')
					.css({
						'width': '85px'
					});
				
				angular.element('.open-expand')
					.addClass('hidden');
					
			} else {
				custIsExpanded = true;
				
				angular.element('.sidenav-toolbar')
					.css({
						'width': '200px'
					});
				
				$timeout(function(){
					angular.element('.open-expand')
						.removeClass('hidden');
				}, 285);
			};
		} else {
			angular.element('.sidenav-toolbar')
					.css({
						'width': '85px'
					});
				
				angular.element('.open-expand')
					.addClass('hidden');
				
				angular.element('#toggle-menu-button')
					.addClass('hidden');
		}
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
		}, 25);
	};
	
	$scope.activeTab();
	
	
	
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
	
	$scope.toggleSidenav();
});