app.controller('adminInactiveCtrl', function($scope, dataService) {
	// $scope.dummyInactiveList = [
	// 	{
	// 		companyName: 'MX',
	// 		emplCount: '700+',
	// 		requestedSkills: ['React', 'Bootstrap'],
	// 		bio: 'We are MX. Yeah? Well I\'m the Lord of Time. You need to get yourself a better dictionary. When you do, look up \'genocide\'. You\'ll find a little picture of me there, and the caption\'ll read \'Over my dead body\'. I\'ll tell you what, then: don\'t...step on any butterflies. What have butterflies ever done to you? Sweet, maybe... Passionate, I suppose... But don\'t ever mistake that for nice. Black tie...Whenever I wear this, something bad always happens. Blimey, trying to make an Ood laugh... It is! It\'s the city of New New York! Strictly speaking, it\'s the fifteenth New York since the original, so that makes it New-New-New-New-New-New-New-New-New-New-New-New-New-New-New New York. ',
	// 		companyLogo: 'http://ww1.prweb.com/prfiles/2014/10/07/12232613/MX%20Logo.png',
	// 		isPending: false,
	// 		isActive: false,
	// 		id: '1'
	// 	},
	// 	{
	// 		companyName: 'Domo',
	// 		emplCount: '300+',
	// 		requestedSkills: ['Node.js', 'AngularJS', 'WebSQL'],
	// 		bio: 'We are Domo. Biff, stop it. Biff, you\'re breaking his arm. Biff, stop. What? Yeah, you got my homework finished, McFly? What, right here right now in the cafeteria? What is she said no? I don\'t know if I could take that kind of rejection. Besides, I think she\'d rather go with somebody else. Yeah, where does he live?',
	// 		companyLogo: 'http://scopespring.com/assets/participants/sponsorlogo78.jpg',
	// 		isPending: false,
	// 		isActive: false,
	// 		id: '2'
	// 	},
	// 	{
	// 		companyName: 'Procter & Gamble',
	// 		emplCount: '18,000+',
	// 		requestedSkills: ['Node.js', 'AngularJS', 'WebSQL'],
	// 		bio: 'We are P&G. Angrenost arthad dunlendings echad i sedryn farewell speech first battle first battle of the fords of isen fëanorian great gates hithlain horsebreeders lords of valinor mountain wall máhanaxar oghor-hai ring of sapphire rivil sheen thousand caves umbardacil winterfilth wise-nose. Andúnië araw borlach caragdûr celepharn ciryatur corsairs of umbar doves dís falathrim firefoot galvorn heir of anárion lithlad naith necromancer orgulas brandybuck oxen parth celebrant ramdal silmariën silver pennies three houses of the elf-friends théodwyn togo goodbody tower of the sun tradition of isildur turambar, surname of túrin windlord yuledays.',
	// 		companyLogo: 'http://news.pg.com/sites/pg.newshq.businesswire.com/files/logo/image/PGPhaseLogo.jpg',
	// 		isPending: false,
	// 		isActive: true,
	// 		id: '3'
	// 	},
	// 	{
	// 		companyName: 'Unilever',
	// 		emplCount: '24,000+',
	// 		requestedSkills: ['Node.js', 'AngularJS', 'WebSQL'],
	// 		bio: 'We are Unilever. Adventure island ii adventure island 3 bad street brawler caveman games felix the cat gotcha! the sport! hydlide infiltrator isolated warrior lee trevino\'s fighting golf legacy of the wizard magic johnson\'s fast break mega man 6 mission: impossible snow brothers star voyager superman town & country surf designs: wood & water rage treasure master twin eagle vegas dream wheel of fortune where\'s waldo? zoda\'s revenge: startropics ii. Adventures in the magic kingdom bad street brawler battle tank battletoads california games darkman déjà vu faxanadu fisher-price: perfect fit freedom force gyruss ikari warriors ii: victory road m.u.l.e. new ghostbusters 2 nintendo world championships pro sport hockey rollerball sky kid snoopy\'s silly sports spectacular spot: the video game spy hunter trojan volleyball xexyz.',
	// 		companyLogo: 'https://pbs.twimg.com/profile_images/473412614387535872/anW5fha_.jpeg',
	// 		isPending: false,
	// 		isActive: true,
	// 		id: '4'
	// 	}
	// ];
	
	$scope.inactiveList = [];
	
	$scope.getInactiveCompanies = function() {
		dataService.getInactiveCompanies()
			.then(function(result) {
				$scope.inactiveList = result; 
			});
		console.log($scope.inactiveList);
	};
	
	$scope.getInactiveCompanies();
	
	$scope.search = function(company) {
		return (angular.lowercase(company.companyName).indexOf(angular.lowercase($scope.query) || '') !== -1);
	};
	
	$scope.deleteCompany = function(company) {
		var index = $scope.inactiveList.indexOf(company);
		
		dataService.deleteCompany($scope.inactiveList[index].id)
			.then(function(result) {
				$scope.inactiveList.splice(index, 1);
			});
	};
	
	$scope.updateStatus = function(company) {
		var index = $scope.inactiveList.indexOf(company);
		
		dataService.updateProfile($scope.inactiveList[index]);
	};
});