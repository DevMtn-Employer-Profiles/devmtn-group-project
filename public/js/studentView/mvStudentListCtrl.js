angular.module('MainApp').controller('mvStudentListCtrl', function($scope, $mdDialog, $window, ModalService, dataService, authService) {
	$scope.profiles = []; (function() {
		dataService.getAllCompanies().then(function(res) {
			for (var i = 0; i < res.length; i++){
				if (res[i].isVisible === true){
					$scope.profiles.push(res[i]);
				}
			}
		});		
	})();

	var currentUser = "",currentUserRoles = [], currentUserProfile = false;
	(function() { authService.getCurrentUser().then(function(res){
			currentUser = res;
			currentUserRoles = res.roles;
			currentUserProfile = res.showProfile;
			console.log(res);
		});
	})();
	
	var companyProfile = function(event, profileId) {
		ModalService.currentProfileId = profileId;
		
		$mdDialog.show({
			controller: 'ModalController',
			templateUrl: 'js/modal/modal.html',
			parent: angular.element(document.body),
			targetEvent: event,
			clickOutsideToClose: true
		});
	};
	$scope.user = function(role){
		for(var i = 0; i < currentUserRoles.length; i++){
			if (currentUserRoles[i] == role) return true;
		}
	};
	
	$scope.openProfile = function(event, profile){
		for(var i = 0; i < currentUserRoles.length; i++){
			if (currentUserRoles[i] == 'student'){
				if(currentUserProfile === true) companyProfile(event, profile._id);
				else $mdDialog.show({
						controller: 'ModalController',
						templateUrl: 'js/studentView/unfinishedProfileModal.html',
						parent: angular.element(document.body),
						targetEvent: event,
						clickOutsideToClose: true
				});
			} else $window.location.href=profile.website;
		}
		
	};
	
	$scope.search = function(company) {
		return (angular.lowercase(company.companyName).indexOf(angular.lowercase($scope.query) || '') !== -1);
	};
	
});