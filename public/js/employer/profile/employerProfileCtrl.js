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
			console.log(result);
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
		});
		
		$scope.profile.skills = newSkills;
		//Push to database
		dataService.updateProfile($scope.profile)
			.then(function(result) {
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
	
	//Skills
	$scope.addSelectedSkill = function(newSkill) {
		console.log("ADDING: ", newSkill);
		if(newSkill && $scope.editedProfile.skills.indexOf(newSkill) === -1) {
			$scope.editedProfile.skills.push(newSkill);
		}
	}
	
	$scope.removeSkill = function(idx) {
		$scope.editedProfile.skills.splice(idx, 1);
	}
	
	$scope.requestSkill = function(skill) {
		$scope.skillToSubmit = '';
	}
	
	
	//Job Postings
	$scope.addNewJob = function(url) {
		$scope.editedProfile.jobPostings.push(url);
		$scope.newJobUrl = '';
	}
	
	$scope.removeJob = function(idx) {
		$scope.editedProfile.jobPostings.splice(idx, 1);
	}
	
	//Contact Email
	$scope.addContactEmail = function(newEmail) {
		$scope.editedProfile.contactEmails.push(newEmail);
		$scope.newContactEmail = '';
	}
	
	$scope.deleteEmail = function(idx) {
		$scope.editedProfile.contactEmails.splice(idx, 1);
	}
	
	loadProfile();
})

//add a company url