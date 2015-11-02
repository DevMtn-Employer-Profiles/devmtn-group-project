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
		
			.state('Admin.All', {
				url: '/all',
				templateUrl: 'js/admin/all/all.html',
				controller: 'adminAllCtrl'
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