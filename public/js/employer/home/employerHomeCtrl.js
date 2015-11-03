angular.module('MainApp').controller('employerHomeCtrl', function($scope, dataService){
	$scope.myProfile = {};
	
	dataService.getMyProfile().then(function(result) {
		$scope.myProfile = result;
		//Determine profile status
		if(result.isPending) {
			
		} else {
			
		}
	});
})