app.controller('adminSkillsCtrl', function($scope, dataService) {
	
	$scope.skills = [];
	$scope.addingSkill = false;
	$scope.editList = [];
	
	$scope.ToggleEdit = function(skill) {
		console.log(skill._id);
		var iidx = $scope.editList.indexOf(skill._id);
		console.log(iidx);
		if(iidx === -1) {
			//not in list
			$scope.editList.push(skill._id);
		} else {
			$scope.editList.splice(iidx, 1);
			//SAVE HERE
			$scope.updateSkill(skill);
		}
	}
	
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
			$scope.addingSkill = false;
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