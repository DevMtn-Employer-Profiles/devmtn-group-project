var app = angular.module('MainApp', ['ui.router']);

app.config(function($urlRouterProvider, $stateProvider) {
	$stateProvider
		.state('Landing', {
			url: '/',
			templateUrl: 'landing/landing.html',
			controller: 'LandingController'
		})
		
		.state('Employer', {
			url: '/employer',
			templateUrl: '/employer/employer.html',
			controller: 'employerCtrl'
		})
		
			.state('Employer.Students', {
				url: '/employer/students',
				templateUrl: '/employer/student-view/students.html',
				controller: 'emplStudCtrl'
			})
			
			.state('Employer.Matching', {
				url: '/employer/matching',
				templateUrl: '/employer/matching/matching.html',
				controller: 'emplMatchCtrl'
			})
			
			.state('Employer.Profile', {
				url: '/employer/profile',
				templateUrl: '/employer/profile/profile.html',
				controller: 'emplProfileCtrl'
			})
		
		.state('List', {
			url: '/list',
			templateUrl: '/list/list.html',
			controller: 'listCtrl'
		})
		
		.state('Admin', {
			url: '/admin',
			templateUrl: '/admin/admin.html',
			controller: 'adminCtrl'
		});
});