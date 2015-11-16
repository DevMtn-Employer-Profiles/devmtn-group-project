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
			url: '/api/profiles/' + companyId
		}).then(function(response) {
			deferred.resolve(response.data);
		}, handleError);
		
		return deferred.promise;
	}
	
	this.getAllCompanies = function() {
		var deferred = $q.defer();
		
		$http({
			method: 'GET',
			url: '/api/profiles/all'
		}).then(function(response) {
			deferred.resolve(response.data);
		}, handleError);
		
		return deferred.promise;
	}
	
	this.getPendingCompanies = function() {
		var deferred = $q.defer();
		
		$http({
			method: 'GET',
			url: '/api/profiles/pending'
		}).then(function(response) {
			deferred.resolve(response.data);
		}, handleError);
		
		return deferred.promise;
	}
	
	this.getActiveCompanies = function() {
		return $http({
			method: 'GET',
			url: '/api/profiles/active'
		}).then(simpleDataReturn, handleError);
	}
	
	this.getInactiveCompanies = function() {
		return $http({
			method: 'GET',
			url: '/api/profiles/inactive'
		}).then(simpleDataReturn, handleError);
	}
	
	this.deleteCompany = function(companyId) {
		return $http({
			method: 'DELETE',
			url: '/api/profiles/' + companyId	

		}).then(simpleDataReturn, handleError)
	}
	
	this.createCompany = function(company) {
		return $http({
			method: 'POST',
			url: '/api/profiles/',
			data: company	
		}).then(simpleDataReturn, handleError)
	}
	
	this.acceptCompany = function(company) {
		return $http({
			method: 'PUT',
			url: '/api/profiles/accept/' + company._id,
			data: company
		});
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
	
	this.getMyProfile = function() {
		return $http({
			method: 'GET',
			url: '/api/my-profile/'
		}).then(simpleDataReturn, handleError);
	}
	
	this.updateProfile = function(newProfile) {
		return $http({
			method: 'PUT',
			url: '/api/my-profile',
			data: newProfile	
		}).then(simpleDataReturn, handleError)
	}
	
	this.requestProfileApproval = function() {
		return $http({
			method: 'PUT',
			url: '/api/my-profile/request-approval'
		}).then(simpleDataReturn, handleError);
	}
});