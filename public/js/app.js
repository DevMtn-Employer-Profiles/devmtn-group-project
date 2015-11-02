var app = angular.module('MainApp', ['ui.router', 'ngMaterial']);

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
				url: '/students',
				templateUrl: 'js/employer/student-view/students.html',
				controller: 'emplStudCtrl'
			})
			
			.state('Employer.Matching', {
				url: '/matching',
				templateUrl: 'js/employer/matching/matching.html',
				controller: 'emplMatchCtrl'
			})
			
			.state('Employer.Profile', {
				url: '/profile',
				templateUrl: 'js/employer/profile/profile.html',
				controller: 'emplProfileCtrl'
			})
		
		
		
		.state('Admin', {
			url: '/admin',
			templateUrl: 'js/admin/admin.html',
			controller: 'adminCtrl'
		})
		
			.state('Admin.Active', {
				url: '/active',
				templateUrl: 'js/admin/active/active.html',
				controller: 'adminActiveCtrl'
			})
			
			.state('Admin.Inactive', {
				url: '/inactive',
				templateUrl: 'js/admin/inactive/inactive.html',
				controller: 'adminInactiveCtrl'
			})
			
			.state('Admin.Pending', {
				url: '/pending',
				templateUrl: 'js/admin/pending/pending.html',
				controller: 'adminPendingCtrl'
			})
			
			.state('Admin.Skills', {
				url: '/skills',
				templateUrl: 'js/admin/skills/skills.html',
				controller: 'adminSkillsCtrl'
			});
	
	$urlRouterProvider.otherwise('/');
});