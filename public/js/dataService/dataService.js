angular.module('MainApp').service('dataService', function($http, $q, $state) {
	
	var simpleDataReturn = function(result) {
		return result.data;
	}
	
	var handleError = function(error) {
		if(error.status===401) {
			//unauthorized! get them out of here!
			$state.go('Landing');
		}
		console.error(error);
	}
	
	this.getCompanyById = function(companyId) {
		var deferred = $q.defer();
		
		$http({
			method: 'GET', 
			url: '/api/profile/' + companyId
		}).then(function(response) {
			deferred.resolve(response.data);
		}, handleError);
		
		return deferred.promise;
	}
	
	this.getAllCompanies = function() {
		var deferred = $q.defer();
		
		$http({
			method: 'GET',
			url: '/api/profile/all'
		}).then(function(response) {
			deferred.resolve(response.data);
		}, handleError);
		
		return deferred.promise;
	}
	
	this.getPendingCompanies = function() {
		var deferred = $q.defer();
		
		$http({
			method: 'GET',
			url: '/api/profile/pending'
		}).then(function(response) {
			deferred.resolve(response.data);
		}, handleError);
		
		return deferred.promise;
	}
	
	this.getActiveCompanies = function() {
		return $http({
			method: 'GET',
			url: '/api/profile/active'
		}).then(simpleDataReturn, handleError);
	}
	
	this.getInactiveCompanies = function() {
		return $http({
			method: 'GET',
			url: '/api/profile/inactive'
		}).then(simpleDataReturn, handleError);
	}
	
	this.deleteCompany = function(companyId) {
		return $http({
			method: 'DELETE',
			url: '/api/profile/' + companyId	

		}).then(simpleDataReturn, handleError)
	}
	
	this.createCompany = function(company) {
		return $http({
			method: 'POST',
			url: '/api/profile/',
			data: company	
		}).then(simpleDataReturn, handleError)
	}
	
	//Admin Matching Web Requests
	this.getAllStudents = function() {
		return $http({
			method: 'GET',
			url: '/api/students'
		}).then(simpleDataReturn, handleError);
	}
	
	this.getMatchData = function(matchId) {
		return $http({
			method: 'GET',
			url: '/api/matches/'+matchId
		}).then(simpleDataReturn, handleError);
	}
	
	this.runAlgorithm = function(data) {
		return $http({
			method: 'POST',
			url: '/api/algorithm',
			data: data
		})
	}
	
	//Employer Web Requests
	this.createSkill = function(skill) {
		return $http({
			method: 'POST',
			url: '/api/skills',
			data: skill
		}).then(simpleDataReturn, handleError);
	}
	
	this.getSkills = function() {
		var deferred = $q.defer();
		
		$http({
			method: 'GET',
			url: '/api/skills'
		}).then(function(result) {
			deferred.resolve(result.data);
		}, handleError);
		
		return deferred.promise;
	}
	
	this.updateSkill = function(skill) {
		return $http({
			method: 'PUT',
			url: '/api/skills/'+skill._id,
			data: skill
		}).then(simpleDataReturn, handleError);
	}
	
	this.deleteSkill = function(skillId) {
		return $http({
			method: 'DELETE',
			url: '/api/skills/' + skillId
		}).then(simpleDataReturn, handleError);
	}
	
	// this.getSkillById = function(skillId) {
	// 	var deferred = $q.defer();
		
	// 	$http({
	// 		method: 'GET',
	// 		url: '/api/skills/' + skillId
	// 	}).then(function(response) {
	// 		deferred.resolve(response.data);
	// 	}, handleError)
		
	// 	return deferred.promise;
	// }
	
	this.getMyProfile = function() {
		return $http({
			method: 'GET',
			url: '/api/myProfile/'
		}).then(simpleDataReturn, handleError);
	}
	
	this.updateProfile = function(newProfile) {
		console.log("UPDATING PROFILE: ", newProfile);
		return $http({
			method: 'PUT',
			url: '/api/profile/'+newProfile._id,
			data: newProfile	

		}).then(simpleDataReturn, handleError)
	}
	
	//Notification web requests
	this.getNotifications = function() {
		var deferred = $q.defer();
		
		$http({
			method: 'GET',
			url: '/api/notifications'
		}).then(function(response) {
			deferred.resolve(response.data);
		}, handleError);
		
		return deferred.promise;
	}
	this.deleteNotification = function(noteId) {
		return $http({
			method: 'DELETE',
			url: '/api/notifications/'+noteId
		}).then(simpleDataReturn, handleError);
	}
	this.addNotification = function(msg) {
		return $http({
			method: 'POST',
			url: '/api/notifications',
			data: {message: msg}
		}).then(simpleDataReturn, handleError);
	}
	this.updateNotification = function(noteId, changeObj) {
		return $http({
			method: 'PUT',
			url: '/api/notifications/' + noteId,
			data: changeObj
		}).then(simpleDataReturn, handleError);
	};
});