app.controller('adminProfilesCtrl', function($scope, $filter, $timeout, $mdDialog, ModalService, dataService) {
	$scope.companyList = [];
	
	$scope.filterOptions = [
		{name: "All", abbr: 'all'},
		{name: "Pending", abbr: 'pending'},
		{name: "Active", abbr: 'active'},
		{name: "Inactive", abbr: 'inactive'}
	];
	
	$scope.orderOptions = [
		{name: "Pending Profiles first", abbr: '-isPending'},
		{name: "Name (+)", abbr: 'companyName'},
		{name: "Name (-)", abbr: '-companyName'},
		{name: "Amount of Skills (+)", abbr: '-skills.length'},
		{name: "Amount of Skills (-)", abbr: 'skills.length'}
	];
	
	$scope.printSkillsList = function(company) {
		console.log(company.skills);
	};
	
	
	$scope.search = function(company) {
		if ($scope.filterSelect === 'pending') {
			return (
				(angular.lowercase(company.companyName)
						.indexOf(angular.lowercase($scope.query) || '') !== -1)
					&& company.isPending 
			);
		} else if($scope.filterSelect === 'active') {
			return (
				(angular.lowercase(company.companyName)
						.indexOf(angular.lowercase($scope.query) || '') !== -1)
					&& company.isVisible );
		} else if($scope.filterSelect === 'inactive') {
			return (
				(angular.lowercase(company.companyName)
						.indexOf(angular.lowercase($scope.query) || '') !== -1)
					&& !company.isVisible );
		}
		
		return (angular.lowercase(company.companyName).indexOf(angular.lowercase($scope.query) || '') !== -1);
	};
	
	function getAllCompanies() {
		dataService.getAllCompanies()
			.then(function(response) {
				$scope.companyList = response;
				$scope.lastPage = Math.ceil($scope.companyList.length / 10);
			});
	};
	
	getAllCompanies();
	
	$scope.deleteCompany = function(event, company) {
		var index = $scope.companyList.indexOf(company);
		
		var confirm = $mdDialog.confirm()
							.title('Are you sure that you want to delete the profile for ' + angular.uppercase(company.companyName) + '?')
							.ariaLabel('Delete Profile')
							.targetEvent(event)
							.ok('Delete')
							.cancel('Cancel');
		
		$mdDialog.show(confirm)
			.then(function() {
				dataService.deleteCompany($scope.companyList[index]._id)
					.then(function(result) {
						$scope.companyList.splice(index, 1);
					});
			});
		
	};
	
	
	$scope.updateCompany = function(company) {
		var index = $scope.companyList.indexOf(company);
		$timeout(function() {
			dataService.updateProfile($scope.companyList[index]);
		}, 50);
	};
	
	
	$scope.openProfile = function(event, profileId) {
		ModalService.currentProfileId = profileId;
		 
		$mdDialog.show({
			controller: 'ModalController',
			templateUrl: 'js/modal/modal.html',
			parent: angular.element(document.body),
			targetEvent: event,
			clickOutsideToClose: true
		});
	};
	
	
	$scope.$watch(function() {
		return ModalService.ModalSaveConfirmed;
	}, function(newValue) {
		getAllCompanies();
	});
});