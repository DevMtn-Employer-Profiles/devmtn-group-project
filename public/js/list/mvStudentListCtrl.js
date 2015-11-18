angular.module('MainApp').controller('mvStudentListCtrl', function ($scope, $mdDialog, $window, ModalService, dataService, authService) {

	//Database call functions
	authService.getCurrentUser().then(function (res) {if(currentUser){currentUser = res; currentUserRoles = res.roles; currentUserProfile = res.showProfile;} });
	dataService.getActiveCompanies().then(function (res) { $scope.profiles = res; });


	var currentUser = "",
		currentUserRoles = [],
		currentUserProfile = false,

		companyProfile = function (event, profileId) {
			ModalService.currentProfileId = profileId;

			$mdDialog.show({
				controller: 'ModalController',
				templateUrl: 'js/modal/modal.html',
				parent: angular.element(document.body),
				targetEvent: event,
				clickOutsideToClose: true
			});
		};

	$scope.profiles = [];

	$scope.user = function (role) {
		if (!currentUserRoles) {
			for (var i = 0; i < currentUserRoles.length; i++) {
				if (currentUserRoles[i] == role) return true;
			}
		}
	};

	$scope.openProfile = function (event, profile) {
		if (!currentUserRoles) {
			for (var i = 0; i < currentUserRoles.length; i++) {
				if (currentUserRoles[i] === 'student') {
					if (currentUserProfile) companyProfile(event, profile._id);

					else $mdDialog.show({
						controller: 'ModalController',
						templateUrl: 'js/studentView/unfinishedProfileModal.html',
						parent: angular.element(document.body),
						targetEvent: event,
						clickOutsideToClose: true
					});
				} else $window.location.href = profile.website;
			}
		} else $window.location.href = profile.website;

	};

	$scope.search = function (company) {
		return (angular.lowercase(company.companyName).indexOf(angular.lowercase($scope.query) || '') !== -1);
	};
});