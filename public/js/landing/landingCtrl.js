app.controller('LandingController', function($scope) {
	
	  $(function(){
        $(".element").typed({
            strings: ["First sentence.", "Second sentence."],
            typeSpeed: 0
        });
    });
	
	//typed.js function
	  $scope.updates = ["Web Developer", "iOS Developer", "James Carrigan"];

  $(function() {
    $(".update-box").typed({
      strings: $scope.updates,
      typeSpeed: 40,
      loop: true,
      backDelay: 1500,
      contentType: 'text',
      loopCount: false,
      cursorChar: " |",
    });
    $(".update-box").css({
      'color': '#34ACE0',
      'font-size': '30px',
      'font-weight': 'bold'
    })
  }());

});