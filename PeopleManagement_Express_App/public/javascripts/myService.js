app.service('myService', function ($http) {

	  var lastUsedPageNum;
	this.getlastUsedPage = function() {
		return lastUsedPageNum;
	};

	this.setLastUsedPage = function(num) {
		lastUsedPageNum = num;
	};

	this.getUsers = function($scope) {
		console.log("in service getUsers");
		console.log($scope);
		$http.get("/users/")
          .then(function(response) {
              $scope.users = response.data;
              $scope.totalItems = $scope.users.length;
      	});
	};

	this.getUserById = function(id, $scope) {
		console.log("in service getUsersById");
		console.log($scope);
		$http.get("/users/" + id)
          .then(function(response) {
              $scope.user = response.data;
      	});
	}

	this.deleteUser = function(id, $scope) {
		$http.delete("/users/" + id)
		   .then(function(err) {
		   		// error handling
		    });
	};

	this.updateUser = function($scope) {
		console.log("in service updateUser");
		console.log($scope);
		var data = {
				_id: ($scope.id)?$scope.id : undefined,
			  	fName: $scope.fName,
			  	lName: $scope.lName,
			  	age: $scope.age,
			  	tittle: $scope.tittle,
			  	gender: $scope.gender
			  };
		console.log(data);
		$http.put('/users/' + $scope.id, data)
			.then(function(response) {
				$scope.users = response.data;
			});
		// users.push(user);
		// $scope.users.push({id:getUsersLength() + 1, fName:$scope.fName,lName:$scope.lName, tittle:$scope.tittle, gender:$scope.gender, age:$scope.age });
	};	

	this.test = function($scope) {
    	if ($scope.passw1 !== $scope.passw2) {
    		$scope.error = true;
    	} 
    	else {
    		$scope.error = false;
    	}
    	if ($scope.fName.length && $scope.lName.length && $scope.passw1.length && $scope.passw2.length) {
			$scope.incomplete = false;
    	}
  	};
});


app.filter("ordinal", function() {
  return function(input) {
    input += '';
    var regularExpression = /^[4-9]{1,1}$/
    if(input.charAt(input.length - 1 ) === "1") {input += 'st'; return input;}
    if(input.charAt(input.length - 1 ) === "2") {input += 'nd'; return input;}
    if(input.charAt(input.length - 1 ) === "3") {input += 'rd'; return input;}
    if(regularExpression.test(input.charAt(input.length - 1 ))) {input += 'th'; return input;}
    else return input;
  }
});