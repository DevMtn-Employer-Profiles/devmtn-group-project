var app = angular.module('MainApp', ['ui.router']);

app.config(function($urlRouterProvider, $stateProvider) {
	$stateProvider
		.state('Landing', {
			url: '/',
			templateUrl: 'landing/landing.html',
			controller: 'LandingController'
		})
		
		.state('Profile', {
			url: '/profile',
			templateUrl: '/profile/profile.html',
			controller: 'profileCtrl'
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