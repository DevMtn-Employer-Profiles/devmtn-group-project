//   /api/matches/:id    use this for the resolve. 

angular.module('MainApp').controller('matchViewCtrl', function($scope, dataService, $location) {
	
	var load = function() {
		var link = $location.path();
		var idx = link.lastIndexOf('/');
		var matchId = link.substring(idx + 1);
		dataService.getMatchData(matchId).then(function(results) {
			$scope.results = results;
		})
	}
	
	load();
});