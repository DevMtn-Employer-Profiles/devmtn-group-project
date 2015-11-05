app.controller('ModalController', function($scope, $mdDialog, ModalService, dataService) {
	function getReferencedProfile() {
		ModalService.currentModal
	}
	
	$scope.hide = function() {
		$mdDialog.hide();
	};
	
	$scope.cancel = function() {
		$mdDialog.cancel();
	};
	
	$scope.saveProfile = function(answer) {
		$mdDialog.hide(answer);
	};
});