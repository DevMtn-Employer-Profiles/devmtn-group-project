app.controller('adminCtrl', function($scope, $timeout) {
	var custIsExpanded = false;
	
	$scope.toggleSidenav = function() {
		if (custIsExpanded) {
			custIsExpanded = false;
			
			angular.element('.collapsed-sidenav-toolbar')
				.css({
					'width': '85px'
				});
			
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
			
			$timeout(function(){
				angular.element('.open-expand')
					.removeClass('hidden');
			}, 250);
		};
	}
});