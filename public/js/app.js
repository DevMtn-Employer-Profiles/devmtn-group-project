var app = angular.module('MainApp', ['ui.router']);

app.config(function($urlRouterProvider, $stateProvider) {
	$stateProvider
		.state('Landing', {
			url: '/',
			templateUrl: 'landing/landing.html',
			controller: 'LandingController'
		})
		
		
		
		.state('List', {
			url: '/list',
			templateUrl: '/list/list.html',
			controller: 'listCtrl'
		})
		
		
		
		.state('Employer', {
			url: '/employer',
			templateUrl: '/employer/employer.html',
			controller: 'employerCtrl'
		})
		
			.state('Employer.Students', {
				url: '/students',
				templateUrl: '/employer/student-view/students.html',
				controller: 'emplStudCtrl'
			})
			
			.state('Employer.Matching', {
				url: '/matching',
				templateUrl: '/employer/matching/matching.html',
				controller: 'emplMatchCtrl'
			})
			
			.state('Employer.Profile', {
				url: '/profile',
				templateUrl: '/employer/profile/profile.html',
				controller: 'emplProfileCtrl'
			})
		
		
		
		.state('Admin', {
			url: '/admin',
			templateUrl: 'js/admin/admin.html',
			controller: 'adminCtrl'
		})
		
			.state('Admin.Active', {
				url: '/active',
				templateUrl: '/admin/active/active.html',
				controller: 'adminActiveCtrl'
			})
			
			.state('Admin.Inactive', {
				url: '/inactive',
				templateUrl: '/admin/inactive/inactive.html',
				controller: 'adminInactiveCtrl'
			})
			
			.state('Admin.Pending', {
				url: '/pending',
				templateUrl: '/admin/pending/pending.html',
				controller: 'adminPendCtrl'
			});
	
	$urlRouterProvider.otherwise('/');
});