app.controller('adminSkillsCtrl', function($scope, dataService) {
	
	$scope.skills = [];
	$scope.addingSkill = false;
	
	$scope.getSkills = function() {
		dataService.getSkills()
			.then(function(results) {
				$scope.skills = results;
			})
	}
	
	$scope.getSkills();
	
	$scope.addNewSkill = function() {
		//Add New Skill
		var newSkill = {
			name: $scope.newSkill
		}
		dataService.createSkill(newSkill).then(function(result) {
			//Refresh Skill List
			$scope.getSkills();
			$scope.newSkill = '';
		});
	}
	
	$scope.removeSkill = function(id) {
		dataService.deleteSkill(id).then(function(result) {
			//Refresh List
			$scope.getSkills();
		});
	}
	
	$scope.approveSkill = function(skill) {
		skill.approved = true;
		$scope.updateSkill(skill);
	}
	
	$scope.updateSkill = function(skill) {
		dataService.updateSkill(skill).then(function(result) {
			//refresh skills
			$scope.getSkills();
		});
	}
	
	$scope.showAdd = function() {
		$scope.addingSkill = true;
	};
	
	$scope.cancelNewSkill = function() {
		$scope.addingSkill = false;
		$scope.newSkill = '';
	};
});