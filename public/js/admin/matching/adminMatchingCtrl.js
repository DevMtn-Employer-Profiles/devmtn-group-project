app.controller('adminMatchingCtrl', function ($scope, dataService) {
	//Step 1
	$scope.cohortFilter = 'Choose a Cohort';
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
	}

	$scope.removeStudent = function (student) {
		var idx = $scope.SelectedStudents.indexOf(student);
		var stud = $scope.SelectedStudents.splice(idx, 1);
		$scope.PossibleStudents.push(stud);
	}

	$scope.addAllStudents = function () {
		$scope.SelectedStudents.push($scope.PossibleStudents);
		$scope.PossibleStudents = [];
	}

	$scope.removeAllStudents = function () {
		$scope.PossibleStudents.push($scope.SelectedStudents);
		$scope.SelectedStudents = [];
	}

	getStudents();
	
	//Step 2
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
	}
	
	$scope.removeEmployer = function() {
		console.log("REMOVE");
		var empl = $scope.SelectedEmployers.splice($scope.removeThisSelectedEmployer, 1);
		$scope.PossibleEmployers.push(empl[0]);
	}
	
	$scope.addAllEmployers = function() {
		$scope.SelectedEmployers = $scope.SelectedEmployers.concat($scope.PossibleEmployers);
		$scope.PossibleEmployers = [];
	}
	
	$scope.removeAllEmployers = function() {
		$scope.PossibleEmployers = $scope.PossibleEmployers.concat($scope.SelectedEmployers);
		$scope.SelectedEmployers = [];
	}
	
	getEmployers();
	
	//Step 3
	// $scope.expirationDate = Date.now();
});