angular.module('MainApp').service('dataService', function($http, $q, $state) {
	
	/**********API Calls**********/
	// Profiles - Public	
	this.getActiveCompanies = function() {
		return $http({
			method: 'GET',
			url: '/api/profiles/active'
		}).then(simpleDataReturn, handleError);
	};
	
	// Profiles - Admin
	this.getAllCompanies = function() {
		var deferred = $q.defer();
		
		$http({
			method: 'GET',
			url: '/api/profiles/all'
		}).then(function(response) {
			deferred.resolve(response.data);
		}, handleError);
		
		return deferred.promise;
	};
	
	this.getCompanyById = function(companyId) {
		var deferred = $q.defer();
		
		$http({
			method: 'GET', 
			url: '/api/profiles/' + companyId
		}).then(function(response) {
			deferred.resolve(response.data);
		}, handleError);
		
		return deferred.promise;
	};
	
	this.acceptCompany = function(company) {
		return $http({
			method: 'PUT',
			url: '/api/profiles/accept/' + company._id,
			data: company
		});
	};
	
	this.rejectCompany = function(company) {
		return $http({
			method: 'PUT',
			url: '/api/profiles/reject/' + company._id,
			data: company
		});
	};
	
	this.activateProfile = function(company) {
		return $http({
			method: 'PUT',
			url: '/api/profiles/activate/' + company._id,
			data: company
		});
	};
	
	this.deactivateProfile = function(company) {
		return $http({
			method: 'PUT',
			url: '/api/profiles/deactivate/' + company._id,
			data: company
		});
	};
	
	// __________ MAYBE... ____________________ 
	// this.createCompany = function(company) {
	// 	return $http({
	// 		method: 'POST',
	// 		url: '/api/profiles/',
	// 		data: company	
	// 	}).then(simpleDataReturn, handleError)
	// }
	
	this.deleteCompany = function(companyId) {
		return $http({
			method: 'DELETE',
			url: '/api/profiles/' + companyId	

		}).then(simpleDataReturn, handleError);
	};
	//End
	
	//Profiles - Employer
	this.getMyProfile = function() {
		return $http({
			method: 'GET',
			url: '/api/my-profile/'
		}).then(simpleDataReturn, handleError);
	};
	
	this.updateProfile = function(newProfile) {
		return $http({
			method: 'PUT',
			url: '/api/my-profile',
			data: newProfile	
		}).then(simpleDataReturn, handleError);
	};
	
	this.requestProfileApproval = function() {
		return $http({
			method: 'PUT',
			url: '/api/my-profile/request-approval'
		}).then(simpleDataReturn, handleError);
	};
	//End
	
	//Student Match
	this.getAllStudents = function() {
		return $http({
			method: 'GET',
			url: '/api/students'
		}).then(simpleDataReturn, handleError);
	};
	
	this.getMatchData = function(matchId) {
		return $http({
			method: 'GET',
			url: '/api/matches/'+matchId
		}).then(simpleDataReturn, handleError);
	};
	
	this.runAlgorithm = function(data) {
		return $http({
			method: 'POST',
			url: '/api/algorithm',
			data: data
		});
	};
	//End
	
	//Skills
	this.getSkills = function() {
		var deferred = $q.defer();
		
		$http({
			method: 'GET',
			url: '/api/skills'
		}).then(function(result) {
			deferred.resolve(result.data);
		}, handleError);
		
		return deferred.promise;
	};
	
	this.createSkill = function(skill) {
		return $http({
			method: 'POST',
			url: '/api/skills',
			data: skill
		}).then(simpleDataReturn, handleError);
	};
	
	this.updateSkill = function(skill) {
		return $http({
			method: 'PUT',
			url: '/api/skills/'+skill._id,
			data: skill
		}).then(simpleDataReturn, handleError);
	};
	
	this.deleteSkill = function(skillId) {
		return $http({
			method: 'DELETE',
			url: '/api/skills/' + skillId
		}).then(simpleDataReturn, handleError);
	};
	//End
	
	// Default response functions
	function simpleDataReturn(result) {
		return result.data;
	};
	
	function handleError(error) {
		if(error.status===401) {
			//unauthorized! get them out of here!
			$state.go('Landing');
		}
		console.error(error);
	};
	
});