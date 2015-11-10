angular.module('MainApp').controller('employerProfileCtrl', function($scope, dataService, $state) {
	$scope.message = 'Hello from employer profile controller';
	
	$scope.isEditing  = false;
	
	$scope.skillsOptions = ['Angular', 'Node','React','Webpack', 'Other'];
	
	$scope.profile = {
		companyName: 'Qualtrics',
		bio: 'Located in Provo, Qualtrics is a great company with a cool environment for devs to work in.',
		requirements: ['Willing to relocate', 'High school diploma'],
		skills: ['Angular', 'Node', 'Express', 'Mongo'],
		logo: 'https://image.freepik.com/free-vector/dolphin-clipart_91-5846.jpg'
	};
	
	var loadProfile = function() {
		dataService.getMyProfile().then(function(result) {
			$scope.profile = result;
		});
		dataService.getSkills().then(function(result) {
			$scope.skillsOptions = result;
		})
	}
	
	$scope.editedProfile = {};
	
	//Switches to the Edit Div, and sets the edit vars
	$scope.openEdit = function() {
		$scope.editedProfile = $scope.profile;
		$scope.isEditing = true;
	}
	
	//discard the edited variables and revert to last save
	$scope.cancelEdit = function() {
		$scope.isEditing = false;
	}
	
	$scope.submitProfile = function() {
		// $scope.editedProfile._id = $scope.profile._id;
		$scope.profile.isPending = true;
		//** SET SKILLS TO BE ID's ONLY
		var newSkills = [];
		$scope.profile.skills.forEach(function(item) {
			newSkills.push(item._id);
		})
		$scope.profile.skills = newSkills;
		//Push to database
		dataService.updateProfile($scope.profile).then(function(result) {
			console.log('Profile Updated');
			//Get New Profile
			loadProfile();
		});
		
		$state.go('Employer.Home');
	}
	
	//Saves the edited variables to the database 
	$scope.saveEdit = function() {
		// $scope.editedProfile._id = $scope.profile._id;
		$scope.profile = $scope.editedProfile;
		if($scope.profile.isVisible) {
			$scope.profile.isPending = true;
		}
		//** SET SKILLS TO BE ID's ONLY
		var newSkills = [];
		$scope.profile.skills.forEach(function(item) {
			newSkills.push(item._id);
		})
		console.log("New Skills: ", newSkills);
		$scope.profile.skills = newSkills;
		//Push to database
		dataService.updateProfile($scope.profile).then(function(result) {
			console.log('Profile Updated');
			//Get New Profile
			loadProfile();
		});
		//Close Profile Edit Div
		$scope.isEditing = false;
		$scope.editedProfile = {};
	}
	
	//Get the selected skill and add it to the list if it
	//is not their already
	$scope.addSelectedSkill = function(newSkill) {
		console.log("ADDING: ", newSkill);
		if(newSkill && $scope.editedProfile.skills.indexOf(newSkill) === -1) {
			$scope.editedProfile.skills.push(newSkill);
		}
	}
	
	//Remove the selected skill from the skills list
	$scope.removeSkill = function(idx) {
		$scope.editedProfile.skills.splice(idx, 1);
	}
	
	//Adds the new requirement to the list and resets the inputs value
	$scope.addNewRequirement = function(newReq) {
		$scope.editedProfile.requirements.push(newReq);
		$scope.newRequirement = '';
	}
	
	//Splice value from an array
	$scope.removeRequirement = function(idx) {
		$scope.editedProfile.requirements.splice(idx, 1);
	}
	
	$scope.changeSelectedSkill = function(val) {
		if(val ==='Other') {
			$scope.showNewSkill = true;
		} else {
			$scope.showNewSkill = false;
		}
	}
	
	$scope.submitNewSkill = function(newSkill) {
		if($scope.skillsOptions.indexOf(newSkill) === -1) {
			//Send to server this new skill
			dataService.createSkill(newSkill).then(function(result) {
				console.log("Skill Created");
			});
			//add to list
			$scope.skillsOptions.push(newSkill);
			$scope.newSkill = '';
			$scope.editedProfile.skills.push(newSkill);
			$scope.showNewSkill = false;
		}
	}
	
	loadProfile();
})