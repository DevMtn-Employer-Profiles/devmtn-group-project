angular.module('MainApp').controller('employerProfileCtrl', function($scope) {
	$scope.message = 'Hello from employer profile controller';
	
	$scope.isEditing  = false;
	
	$scope.skillsOptions = ['Angular', 'Node','React','Webpack'];
	
	$scope.profile = {
		company_name: 'Qualtrics',
		bio: 'Located in Provo, Qualtrics is a great company with a cool environment for devs to work in.',
		requirements: ['Willing to relocate', 'High school diploma'],
		skills: ['Angular', 'Node', 'Express', 'Mongo'],
		logo: ''
	};
	
	$scope.editedProfile = {};
	
	//Switches to the Edit Div, and sets the edit vars
	$scope.openEdit = function() {
		$scope.editedProfile = $scope.profile;
		$scope.isEditing = true;
	}
	
	//discard the edited variables and revert to 
	//last save
	$scope.cancelEdit = function() {
		$scope.isEditing = false;
	}
	
	//Saves the edited variables to the database 
	$scope.saveEdit = function() {
		$scope.profile = $scope.editedProfile;
		//Push to database
		
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
	
})