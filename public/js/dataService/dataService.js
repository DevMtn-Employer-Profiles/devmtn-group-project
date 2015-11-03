angular.module('MainApp').service('dataService', function($http) {
	
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
		return $http({
			method: 'GET',
			url: '/api/profile/all'
		}).then(simpleDataReturn, handleError);
	}
	
	this.getPendingCompanies = function() {
		return $http({
			method: 'GET',
			url: '/api/profile/pending'
		}).then(simpleDataReturn, handleError);
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
	
	//Employer Web Requests
	this.createSkill = function(skill) {
		return $http({
			method: 'POST',
			url: '/api/skills',
			data: skill
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
			url: '/api/company/'+newProfile._id,
			data: newProfile	

		}).then(simpleDataReturn, handleError)
	}
	
	//Notification web requests
	this.getNotifications = function() {
		return $http({
			method: 'GET',
			url: '/api/notifications'
		}).then(simpleDataReturn, handleError);
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