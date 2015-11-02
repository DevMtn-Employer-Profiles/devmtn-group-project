var app = angular.module('MainApp', ['ui.router']);

app.config(function($urlRouterProvider, $stateProvider) {
	$stateProvider
		.state('Landing', {
			url: '/',
			templateUrl: 'js/landing/landing.html'
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
		
			.state('Employer.Students', {
				url: '/employer/students',
				templateUrl: 'js/employer/student-view/students.html',
				controller: 'emplStudCtrl'
			})
			
			.state('Employer.Matching', {
				url: '/employer/matching',
				templateUrl: 'js/employer/matching/matching.html',
				controller: 'emplMatchCtrl'
			})
			
			.state('Employer.Profile', {
				url: '/employer/profile',
				templateUrl: 'js/employer/profile/profile.html',
				controller: 'emplProfileCtrl'
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