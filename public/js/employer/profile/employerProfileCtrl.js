angular.module('MainApp').controller('employerProfileCtrl', function($scope) {
	$scope.message = 'Hello from employer profile controller';
	
	$scope.profile = {
		company_name: 'Qualtrics',
		bio: 'Located in Provo, Qualtrics is a great company with a cool environment for devs to work in.',
		requirements: ['Willing to relocate', 'High school diploma'],
		skills: ['Angular', 'Node', 'Express', 'Mongo'],
		logo: null
	};
})