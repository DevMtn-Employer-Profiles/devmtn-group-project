angular.module('MainApp').controller('employerProfileCtrl', function($scope, dataService, $state) {
	$scope.message = 'Hello from employer profile controller';
	
	$scope.isEditing  = false;
	
	$scope.skillsOptions = ['Angular', 'Node','React','Webpack', 'Other'];
	
	$scope.statusMessage = 'loading...';
	
	$scope.profile = {
		companyName: 'Qualtrics',
		bio: 'Located in Provo, Qualtrics is a great company with a cool environment for devs to work in.',
		requirements: ['Willing to relocate', 'High school diploma'],
		skills: ['Angular', 'Node', 'Express', 'Mongo'],
		logo: 'https://image.freepik.com/free-vector/dolphin-clipart_91-5846.jpg'
	};
	
	$scope.showSubmit = false;
	
	var setStatus = function(profile) {
		var status = profile.hasOwnProperty('submit');
		if(status && profile.submit != null) {
			$scope.showSubmit = false;
			if(profile.submit) {
				//Status for pending administrator approval
				$scope.showSubmit = false;
				$scope.statusMessage = 'Pending Administrator Approval';
			} else {
				//status for saved but not pending
				$scope.showSubmit = true;
				$scope.statusMessage = 'Your profile is saved. Press submit to request administrator approval.';
			}
		} else {
			if(profile.isVisible) {
				$scope.showSubmit = false;
				$scope.statusMessage = 'Your profile is live!';
			} else {
				$scope.showSubmit = false;
				$scope.statusMessage = 'Your Profile is not live, go and edit it.';
			}
		}
	}
	
	var loadProfile = function() {
		dataService.getMyProfile().then(function(result) {
			$scope.profile = result;
			setStatus(result);
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
		dataService.requestProfileApproval().then(function(result) {
			loadProfile();
		});
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