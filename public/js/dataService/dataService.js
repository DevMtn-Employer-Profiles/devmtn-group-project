angular.module('MainApp').service('dataService', function($http, $q) {
	
	var simpleDataReturn = function(result) {
		return result.data;
	}
	
	var handleError = function(error) {
		console.error(error);
	}
	
	this.getCompanyById = function(companyId) {
		return $http({
			method: 'GET', 
			url: '/api/profile/' + companyId
		}).then(simpleDataReturn, handleError);
	}
	
	this.getAllCompanies = function() {
		var deferred = $q.defer();
		
		$http({
			method: 'GET',
			url: '/api/profile'
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
		var deferred = $q.defer();
		
		$http({
			method: 'GET',
			url: '/api/profile/active'
		}).then(function(response) {
			deferred.resolve(response.data);
		}, handleError);
		
		return deferred.promise;
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
	
	//Employer Web Requests
	this.createSkill = function(skill) {
		return $http({
			method: 'POST',
			url: '/api/skills',
			data: skill
		}).then(simpleDataReturn, handleError);
	}
	
	this.getSkills = function() {
		return $http({
			method: 'GET',
			url: '/api/skills'
		}).then(simpleDataReturn, handleError);
	}
	
	this.getMyProfile = function() {
		return $http({
			method: 'GET',
			url: '/api/myProfile'
		}).then(simpleDataReturn, handleError);
	}
	
	this.updateProfile = function(newProfile) {
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
});