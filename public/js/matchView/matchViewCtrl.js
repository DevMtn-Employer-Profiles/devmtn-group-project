//   /api/matches/:id    use this for the resolve. 

angular.module('MainApp').controller('matchViewCtrl', function($scope, dataService, $location, $stateParams) {
	
	var load = function() {
		// var link = $location.path();
		// var idx = link.lastIndexOf('/');
		// var matchId = link.substring(idx + 1);
		console.log("GETTING INFO");
		dataService.getMatchData($stateParams.id).then(function(results) {
			$scope.students = results;
			console.log(results);
		})
	}
	
	load();
});