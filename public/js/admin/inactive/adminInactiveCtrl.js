app.controller('adminInactiveCtrl', function($scope) {
	$scope.dummyInactiveList = [
		{
			companyName: 'MX',
			emplCount: '700+',
			requestedSkills: ['React', 'Bootstrap'],
			bio: 'We are MX. Yeah? Well I\'m the Lord of Time. You need to get yourself a better dictionary. When you do, look up \'genocide\'. You\'ll find a little picture of me there, and the caption\'ll read \'Over my dead body\'. I\'ll tell you what, then: don\'t...step on any butterflies. What have butterflies ever done to you? Sweet, maybe... Passionate, I suppose... But don\'t ever mistake that for nice. Black tie...Whenever I wear this, something bad always happens. Blimey, trying to make an Ood laugh... It is! It\'s the city of New New York! Strictly speaking, it\'s the fifteenth New York since the original, so that makes it New-New-New-New-New-New-New-New-New-New-New-New-New-New-New New York. ',
			companyLogo: 'http://ww1.prweb.com/prfiles/2014/10/07/12232613/MX%20Logo.png'
		},
		{
			companyName: 'Domo',
			emplCount: '300+',
			requestedSkills: ['Node.js', 'AngularJS', 'WebSQL'],
			bio: 'We are Domo. Biff, stop it. Biff, you\'re breaking his arm. Biff, stop. What? Yeah, you got my homework finished, McFly? What, right here right now in the cafeteria? What is she said no? I don\'t know if I could take that kind of rejection. Besides, I think she\'d rather go with somebody else. Yeah, where does he live?',
			companyLogo: 'http://scopespring.com/assets/participants/sponsorlogo78.jpg'
		}
	];
	
	$scope.inactiveList = [];
	
	// $scope.getActiveCompanies = function() {
	// 	// $scope.activeList = dataService.getActiveCompanies();
	// 	console.log($scope.activeList);
	// };
	
	// $scope.getActiveCompanies();
});