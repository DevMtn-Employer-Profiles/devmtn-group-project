app.controller('adminMatchingCtrl', function ($scope, dataService, $state) {
	//Step 1
	$scope.cohortFilter = 'All';
	$scope.cohorts = ['All', 'Web-DM5', 'Web-DM6', 'Web-DM7'];
	$scope.PossibleStudents = [];
	$scope.SelectedStudents = [];
	$scope.addThisSelectedStudent = {};
	$scope.removeThisSelectedStudent = {};

	//Populates the student list with all available students
	var getStudents = function () {
		dataService.getAllStudents().then(function (result) {
			console.log("Populating possible students: ", result);
			$scope.PossibleStudents = result;
		})
	}

	$scope.addStudent = function (student) {
		var idx = $scope.PossibleStudents.indexOf(student);
		var stud = $scope.PossibleStudents.splice(idx);
		$scope.SelectedStudents.push(stud);
		$scope.validateReady();
	}

	$scope.removeStudent = function (student) {
		var idx = $scope.SelectedStudents.indexOf(student);
		var stud = $scope.SelectedStudents.splice(idx, 1);
		$scope.PossibleStudents.push(stud);
		$scope.validateReady();
	}

	$scope.addAllStudents = function () {
		$scope.SelectedStudents.push($scope.PossibleStudents);
		$scope.PossibleStudents = [];
		$scope.validateReady();
	}

	$scope.removeAllStudents = function () {
		$scope.PossibleStudents.push($scope.SelectedStudents);
		$scope.SelectedStudents = [];
		$scope.validateReady();
	}

	getStudents();
	
	//Step 2
	$scope.employerFilters = ['All', 'Visible', "Not Visible"];
	$scope.empFilter = 'All';
	$scope.PossibleEmployers = [''];
	$scope.SelectedEmployers = [];
	$scope.addThisSelectedEmployer = -1;
	$scope.removeThisSelectedEmployer = -1;
	
	//Populates the employer list with all available employers
	var getEmployers = function() {
		dataService.getAllCompanies().then(function(result) {
			console.log("Populating possible employers: ", result);
			$scope.PossibleEmployers = result;
		});
	}
	
	$scope.changeSelectedEmployer = function(idx) {
		$scope.addThisSelectedEmployer = idx;
		console.log("SELECT", idx);
	}
	
	$scope.addEmployer = function() {
		var empl = $scope.PossibleEmployers.splice($scope.addThisSelectedEmployer, 1);
		$scope.SelectedEmployers.push(empl[0]);
		$scope.validateReady();
	}
	
	$scope.removeEmployer = function() {
		console.log("REMOVE");
		var empl = $scope.SelectedEmployers.splice($scope.removeThisSelectedEmployer, 1);
		$scope.PossibleEmployers.push(empl[0]);
		$scope.validateReady();
	}
	
	$scope.addAllEmployers = function() {
		$scope.SelectedEmployers = $scope.SelectedEmployers.concat($scope.PossibleEmployers);
		$scope.PossibleEmployers = [];
		$scope.validateReady();
	}
	
	$scope.removeAllEmployers = function() {
		$scope.PossibleEmployers = $scope.PossibleEmployers.concat($scope.SelectedEmployers);
		$scope.SelectedEmployers = [];
		$scope.validateReady();
	}
	
	getEmployers();
	
	//Step 3
	// $scope.expirationDate = Date.now();
	$scope.ready = false;
	$scope.readyMessages = [];
	//Validate Form
	$scope.validateReady = function() {
		$scope.readyMessages = [];
		//Validate Students
		if(!$scope.SelectedStudents || $scope.SelectedStudents.length < 1) {
			$scope.ready = false;
			$scope.readyMessages.push('You still need to select some students');
		}
		//Validate Employers
		if(!$scope.SelectedEmployers || $scope.SelectedEmployers.length < 1) {
			$scope.ready = false;
			$scope.readyMessages.push('You still need to select some employers');
		}
		//Validate Date
		if(!$scope.expirationDate) {
			$scope.ready = false;
			$scope.readyMessages.push('Please choose a date for the matches to expire.');
		} else if ($scope.expirationDate < Date.now()) {
			$scope.ready = false;
			$scope.readyMessages.push('Please choose a date that has not passed alread');
		}
		if($scope.ready) {
			document.getElementById('bigSubmitButton').disabled = false;
		} else {
			document.getElementById('bigSubmitButton').disabled = true;
		}
	}
	
	$scope.submitMatches = function() {
		$scope.validateReady();
		var data = {
			students: $scope.SelectedStudents,
			employers: $scope.SelectedEmployers,
			expiration: $scope.expirationDate
		};
		//Send to server to run algorithm
		dataService.runAlgorithm(data).then(function(result) {
			
			$state.go('Admin.All');
		});
	}
	
	$scope.validateReady();
});