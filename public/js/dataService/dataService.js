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
			url: '/api/company/' + companyId
		}).then(simpleDataReturn, handleError);
	}
	
	this.getAllCompanies = function() {
		return $http({
			method: 'GET',
			url: '/api/company/all'
		}).then(simpleDataReturn, handleError);
	}
	
	this.getPendingCompanies = function() {
		return $http({
			method: 'GET',
			url: '/api/company/pending'
		}).then(simpleDataReturn, handleError);
	}
	
	this.getActiveCompanies = function() {
		return $http({
			method: 'GET',
			url: '/api/company/active'
		}).then(simpleDataReturn, handleError);
	}
	
	this.getInactiveCompanies = function() {
		return $http({
			method: 'GET',
			url: '/api/company/inactive'
		}).then(simpleDataReturn, handleError);
	}
	
	this.deleteCompany = function(companyId) {
		return $http({
			method: 'DELETE',
			url: '/api/company/' + companyId	
		}).then(simpleDataReturn, handleError)
	}
	
	this.updateProfile = function(newProfile) {
		return $http({
			method: 'PUT',
			url: '/api/company/'+newProfile._id,
			data: newProfile	
		}).then(simpleDataReturn, handleError)
	}
	
	this.createCompany = function(company) {
		return $http({
			method: 'POST',
			url: '/api/company/',
			data: company	
		}).then(simpleDataReturn, handleError)
	}
	
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
});