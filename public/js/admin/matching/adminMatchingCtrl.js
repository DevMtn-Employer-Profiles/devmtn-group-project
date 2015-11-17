app.controller('adminMatchingCtrl', function ($scope, dataService, $state) {
	//Step 1
	$scope.cohortFilter = {name: 'All', value: true};
	$scope.cohorts = [{name: 'All', value: true}];
	$scope.PossibleStudents = [];
	$scope.SelectedStudents = [];
	$scope.addThisSelectedStudent = 0;
	$scope.removeThisSelectedStudent = 0;

	//Populates the student list with all available students
	var getStudents = function () {
		console.log("getting students");
		dataService.getAllStudents().then(function (result) {
			console.log("Populating possible students: ", result);
			$scope.PossibleStudents = result;
			//see what filters we may need
			var cohorts = [{name: 'All', value: true}];
			result.forEach(function(student) {
				var found = false;
				for(var i = 0; i < cohorts.length && !found; i++) {
					//make a readable identifier
					
					if(cohorts[i].value === student.cohort.cohortname._id)
						found = true;
				}
				if(!found) {
					var cort = student.cohort;
					var stringy = '';
					stringy += cort.cohortLocation.text.substring(0,cort.cohortLocation.text.indexOf(','));
					stringy += ' ' + cort.className.text.substring(0,cort.className.text.indexOf(' '));
					stringy += ' ' + cort.cohortname.text;
					console.log('Stringy', stringy);
					cohorts.push({name: stringy, value: student.cohort.cohortname._id});
				}
			});
			console.log('cohorts: ', cohorts);
			$scope.cohorts = cohorts;
		})
	}
	
	$scope.selectStudent = function(add, idx) {
		if(add) {
			$scope.addThisSelectedStudent = idx;
			// $scope.addStudent();
		} else {
			$scope.removeThisSelectedStudent = idx;
			// $scope.removeStudent();
		}
	}
	
	$scope.addStudent = function () {
		if($scope.addThisSelectedStudent < $scope.PossibleStudents.length) {
			var stud = $scope.PossibleStudents.splice($scope.addThisSelectedStudent, 1);
			console.log('add: ', stud, $scope.addThisSelectedStudent);
			$scope.SelectedStudents.push(stud[0]);
			$scope.validateReady();
		}
	}

	$scope.removeStudent = function () {
		if($scope.removeThisSelectedStudent < $scope.SelectedStudents.length) {
			var stud = $scope.SelectedStudents.splice($scope.removeThisSelectedStudent, 1);
			console.log('remove: ',stud);
			$scope.PossibleStudents.push(stud[0]);
			$scope.validateReady();
		}
	}

	$scope.addAllStudents = function () {
		$scope.SelectedStudents = $scope.SelectedStudents.concat($scope.PossibleStudents);
		$scope.PossibleStudents = [];
		$scope.validateReady();
	}

	$scope.removeAllStudents = function () {
		$scope.PossibleStudents = $scope.PossibleStudents.concat($scope.SelectedStudents);
		$scope.SelectedStudents = [];
		$scope.validateReady();
	}

	getStudents();
	
	//Step 2
	$scope.employerFilters = ['All', 'Visible', "Not Visible"];
	$scope.empFilter = 'All';
	$scope.PossibleEmployers = [];
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
		if($scope.addThisSelectedEmployer < $scope.PossibleEmployers.length) {
			var empl = $scope.PossibleEmployers.splice($scope.addThisSelectedEmployer, 1);
			$scope.SelectedEmployers.push(empl[0]);
			$scope.validateReady();
		}
	}
	
	$scope.removeEmployer = function() {
		if($scope.removeThisSelectedEmployer < $scope.SelectedEmployers.length) {
			var empl = $scope.SelectedEmployers.splice($scope.removeThisSelectedEmployer, 1);
			$scope.PossibleEmployers.push(empl[0]);
			$scope.validateReady();
		}
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
		$scope.ready = true;
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
		//Change enabled for big button
		if($scope.ready) {
			document.getElementById('bigSubmitButton').disabled = false;
		} else {
			document.getElementById('bigSubmitButton').disabled = true;
		}
	}
	
	$scope.submitMatches = function() {
		$scope.validateReady();
		console.log("MATCH");
		var data = {
			students: $scope.SelectedStudents,
			employers: $scope.SelectedEmployers
		};
		//Send to server to run algorithm
		dataService.runAlgorithm(data).then(function(result) {
			$state.go('Admin.Profiles');
		});
	}
	
	$scope.validateReady();
});