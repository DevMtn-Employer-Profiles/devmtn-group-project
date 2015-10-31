app.controller('adminCtrl', function($scope) {
	var custIsExpanded = false;
	
	$scope.toggleSidenav = function() {
		if (custIsExpanded) {
			custIsExpanded = false;
			
			angular.element('.collapsed-sidenav-toolbar')
				.css({
					'width': '85px'
				});
			
			angular.element('.menu-icon')
				.removeClass('pull-right');
			
			angular.element('.open-expand')
				.addClass('hidden');
				
		} else {
			custIsExpanded = true;
			
			angular.element('.collapsed-sidenav-toolbar')
				.css({
					// 'transform': 'translatex(57px)', 
					// 'transform-origin': 'bottom left', 
					'width': '200px'
				});
			
			angular.element('.menu-icon')
				.addClass('pull-right');
			
			angular.element('.open-expand')
				.removeClass('hidden');
		};
	}
});