var app = angular.module('MainApp', ['ui.router', 'ngMaterial', 'angularUtils.directives.dirPagination']);

app.config(function($urlRouterProvider, $stateProvider) {
	$stateProvider
		.state('Landing', {
			url: '/',
			templateUrl: 'js/landing/landing.html'
		})
		
		
		
		.state('List', {
			url: '/list',
			templateUrl: 'js/list/studentList.html',
			controller: 'mvStudentListCtrl'
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
		
			.state('Admin.Profiles', {
				url: '/profiles',
				templateUrl: 'js/admin/profiles/profiles.html',
				controller: 'adminProfilesCtrl'
			})
			
			.state('Admin.Skills', {
				url: '/skills',
				templateUrl: 'js/admin/skills/skills.html',
				controller: 'adminSkillsCtrl'
			})
			
			.state('Admin.CreateProfile', {
				url: '/create-profile',
				templateUrl: 'js/admin/create-profile/create-profile.html',
				controller: 'adminNewProfileCtrl'
			})
			
			.state('Admin.Matching', {
				url: '/matching',
				templateUrl: 'js/admin/matching/adminMatching.html',
				controller: 'adminMatchingCtrl'

			})
			
		.state('Matching', {
			url: '/myMatches/:id',
			templateUrl: 'js/matchView/matchView.html',
			controller: 'matchViewCtrl'
		});
	
	$urlRouterProvider.otherwise('/');
});

app.config(function(paginationTemplateProvider) {
	paginationTemplateProvider.setPath('js/pagination/dirPagination.tpl.html');
});