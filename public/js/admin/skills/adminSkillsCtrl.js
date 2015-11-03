app.controller('adminSkillsCtrl', function($scope, dataService) {
	
	$scope.skills = [];
	
	$scope.getSkills = function() {
		dataService.getSkills()
			.then(function(results) {
				$scope.skills = results;
			})
		console.log('poop'); 
	}
	
	$scope.test = function(data) {
		console.log(data);
	}
	
	$scope.getSkills();
	
});