app.controller('adminActiveCtrl', function($scope, dataService) {
	$scope.dummyActiveList = [
		{
			companyName: 'Procter & Gamble',
			emplCount: '18,000+',
			requestedSkills: ['Node.js', 'AngularJS', 'WebSQL'],
			bio: 'We are P&G. Angrenost arthad dunlendings echad i sedryn farewell speech first battle first battle of the fords of isen fëanorian great gates hithlain horsebreeders lords of valinor mountain wall máhanaxar oghor-hai ring of sapphire rivil sheen thousand caves umbardacil winterfilth wise-nose. Andúnië araw borlach caragdûr celepharn ciryatur corsairs of umbar doves dís falathrim firefoot galvorn heir of anárion lithlad naith necromancer orgulas brandybuck oxen parth celebrant ramdal silmariën silver pennies three houses of the elf-friends théodwyn togo goodbody tower of the sun tradition of isildur turambar, surname of túrin windlord yuledays.',
			companyLogo: 'http://news.pg.com/sites/pg.newshq.businesswire.com/files/logo/image/PGPhaseLogo.jpg',
			isPending: false,
			isActive: true
		},
		{
			companyName: 'Unilever',
			emplCount: '24,000+',
			requestedSkills: ['Node.js', 'AngularJS', 'WebSQL'],
			bio: 'We are Unilever. Adventure island ii adventure island 3 bad street brawler caveman games felix the cat gotcha! the sport! hydlide infiltrator isolated warrior lee trevino\'s fighting golf legacy of the wizard magic johnson\'s fast break mega man 6 mission: impossible snow brothers star voyager superman town & country surf designs: wood & water rage treasure master twin eagle vegas dream wheel of fortune where\'s waldo? zoda\'s revenge: startropics ii. Adventures in the magic kingdom bad street brawler battle tank battletoads california games darkman déjà vu faxanadu fisher-price: perfect fit freedom force gyruss ikari warriors ii: victory road m.u.l.e. new ghostbusters 2 nintendo world championships pro sport hockey rollerball sky kid snoopy\'s silly sports spectacular spot: the video game spy hunter trojan volleyball xexyz.',
			companyLogo: 'https://pbs.twimg.com/profile_images/473412614387535872/anW5fha_.jpeg',
			isPending: false,
			isActive: true
		}
	];
	
	$scope.activeList = [];
	
	$scope.getActiveCompanies = function() {
		// $scope.activeList = dataService.getActiveCompanies();
		console.log($scope.activeList);
	};
	
	$scope.getActiveCompanies();
});