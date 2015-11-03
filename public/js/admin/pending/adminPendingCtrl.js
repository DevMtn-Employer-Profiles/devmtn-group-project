app.controller('adminPendingCtrl', function($scope) {
	$scope.dummyPendingList = [
		{
			companyName: 'Apple',
			emplCount: '25,000+',
			requestedSkills: ['HTML5', 'CSS3', 'jQuery'],
			bio: 'We are Apple. ' +
			'Zombie ipsum brains reversus ab cerebellum viral inferno, brein nam rick mend grimes malum cerveau cerebro. De carne cerebro lumbering animata cervello corpora quaeritis. Summus thalamus brains sit​​, morbo basal ganglia vel maleficia? De braaaiiiins apocalypsi gorger omero prefrontal cortex undead survivor fornix dictum mauris. Hi brains mindless mortuis limbic cortex soulless creaturas optic nerve, imo evil braaiinns stalking monstra hypothalamus adventus resi hippocampus dentevil vultus brain comedat cerebella pitiutary gland viventium. Qui optic gland animated corpse, brains cricket bat substantia nigra max brucks spinal cord terribilem incessu brains zomby. The medulla voodoo sacerdos locus coeruleus flesh eater, lateral geniculate nucleus suscitat mortuos braaaains comedere carnem superior colliculus virus. Zonbi cerebellum tattered for brein solum oculi cerveau eorum defunctis cerebro go lum cerebro. Nescio brains an Undead cervello zombies. Sicut thalamus malus putrid brains voodoo horror. Nigh basal ganglia tofth eliv ingdead.',
			companyLogo: 'http://cdn.ismashphone.com/wp-content/uploads/2011/12/apple-logo.jpeg'
		},
		{
			companyName: 'Microsoft',
			emplCount: '27,000+',
			requestedSkills: ['TypeScript', 'ES6', 'Azure'],
			bio: 'We are Microsoft. Scuppers knave Gold Road bilge chandler barkadeer broadside gally main sheet Brethren of the Coast. Fore clipper barkadeer chandler plunder bring a spring upon her cable dead men tell no tales lookout swab clap of thunder. Sheet cog pink line scurvy square-rigged sutler Plate Fleet transom Jack Ketch.' + 

			' Run a rig Gold Road black spot code of conduct lugger red ensign boatswain list wench jolly boat. Me yo-ho-ho jury mast scuttle spyglass strike colors Jack Ketch squiffy Jack Tar reef. Dead men tell no tales mutiny chase guns jury mast topsail jack draft boatswain holystone no prey, no pay. ' +  
			
			'Careen gibbet pirate measured fer yer chains topmast lad me scallywag Brethren of the Coast matey. Yardarm wherry chantey loot jib jolly boat Blimey bounty tender tackle. Sutler Arr mizzen lanyard flogging fore come about gangplank driver strike colors.',
			companyLogo: 'http://img13.deviantart.net/6aa2/i/2012/255/a/4/microsoft_logo_2012_by_qpstrafe-d5efcom.png'
		}
	];
	
	$scope.pendingList = [];
	
	// $scope.getActiveCompanies = function() {
	// 	// $scope.activeList = dataService.getActiveCompanies();
	// 	console.log($scope.activeList);
	// };
	
	// $scope.getActiveCompanies();
});