var app = angular.module('MainApp', ['ui.router']);

app.config(function($urlRouterProvider, $stateProvider) {
	$stateProvider
		.state('Landing', {
			url: '/',
			templateUrl: 'js/landing/landing.html',
			controller: 'LandingController'
		})
		
		
		
		.state('List', {
			url: '/list',
			templateUrl: 'js/list/list.html',
			controller: 'listCtrl'
		})
		
		
		
		.state('Employer', {
			url: '/employer',
			templateUrl: 'js/employer/employer.html',
			controller: 'employerCtrl'
		})
			.state('Employer.Home', {
				url: '/home',
				templateUrl: 'js/employer/home/employerHome.html',
				controller: 'employerHomeCtrl'
			})
		
			.state('Employer.Students', {
				url: '/students',
				templateUrl: 'js/employer/students/students.html',
				controller: 'employerStudentCtrl'
			})
			
			.state('Employer.Profile', {
				url: '/profile',
				templateUrl: 'js/employer/profile/employerProfile.html',
				controller: 'employerProfileCtrl'
			})
		
		
		
		.state('Admin', {
			url: '/admin',
			templateUrl: 'js/admin/admin.html',
			controller: 'adminCtrl'
		})
		
			.state('Admin.Active', {
				url: '/admin/active',
				templateUrl: 'js/admin/active/active.html',
				controller: 'adminActiveCtrl'
			})
			
			.state('Admin.Inactive', {
				url: '/admin/inactive',
				templateUrl: 'js/admin/inactive/inactive.html',
				controller: 'adminInactiveCtrl'
			})
			
			.state('Admin.Pending', {
				url: '/admin/pending',
				templateUrl: 'js/admin/pending/pending.html',
				controller: 'adminPendCtrl'
			});
	
	$urlRouterProvider.otherwise('/');
});