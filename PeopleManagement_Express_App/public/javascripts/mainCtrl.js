app.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/mainpage/', {
                templateUrl: 'users.html',
                controller: 'userCtrl'
            }).
            when('/edit/:id', {
                templateUrl: 'edit.html',
                controller: 'editCtrl'
            }).
            when('/create/', {
                templateUrl: 'create.html',
                controller: 'createCtrl'
            }).
            otherwise({
                redirectTo: '/mainpage/'
            });
    }]);

app.controller('userCtrl', ['$scope', '$http', 'myService', 'ordinalFilter', function($scope, $http, myService, ordinalFilter) {

  $scope.error = false;
  $scope.incomplete = false; 
  $scope.reverse = false;
  myService.getUsers($scope);

  var temp;

  $scope.sortBy = function(ref) {
    $scope.sortReference = ref;
    $scope.reverse = ($scope.sortReference === temp) ? !$scope.reverse : false;
    temp = $scope.sortReference;
  };
  
  $scope.deleteUser = function(id){
    myService.deleteUser(id, $scope);
    myService.getUsers($scope);
  }

  $scope.getPager = function () {
    // default to first page
    $scope.currentPage = myService.getlastUsedPage() || 1;

    // default page size is 10
    $scope.pageSize = $scope.pageSize || 5;

    // calculate total pages
    $scope.$watch('totalItems', function(){
      $scope.totalPages = Math.ceil($scope.totalItems / $scope.pageSize);
      if ($scope.totalPages <= 10) {
          // less than 10 total pages so show all
          $scope.startPage = 1;
          $scope.endPage = $scope.totalPages;
      } else {
          // more than 10 total pages so calculate start and end pages
          if ($scope.currentPage <= 6) {
              $scope.startPage = 1;
              $scope.endPage = 10;
          } else if ($scope.currentPage + 4 >= $scope.totalPages) {
              $scope.startPage = $scope.totalPages - 9;
              $scope.endPage = $scope.totalPages;
          } else {
              $scope.startPage = $scope.currentPage - 5;
              $scope.endPage = $scope.currentPage + 4;
          }
      }
    // });

    // // //initial endpage for render issue
    // $scope.startPage = ($scope.startPage == undefined)? 1 : $scope.totalPages;
    // $scope.endPage = ($scope.endPage == undefined)? 5 : $scope.totalPages;

    // // calculate start and end item indexes
    $scope.startIndex = ($scope.currentPage - 1) * $scope.pageSize;
    // // $scope.endIndex = $scope.startIndex + $scope.pageSize;

    // // create an array of pages to ng-repeat in the pager control
    // $scope.$watch('totalItems', function() {
      $scope.pages = _.range($scope.startPage, $scope.endPage + 1);
    });
  }

        $scope.getPager();

  $scope.setPage = function(page) {
    if (page < 1 || page > $scope.totalPages) {
        return;
    }
    // get current page 
    console.log(page);
    $scope.startIndex = $scope.pageSize * (page - 1);
    $scope.currentPage = page;
    myService.setLastUsedPage(page);
  }

}]);

app.controller('createCtrl', function($scope, myService) {
  $scope.error = false;
  $scope.incomplete = true;

  $scope.createUser = function(){
    console.log("createUser");
    console.log($scope);
    myService.updateUser({fName:$scope.fName, lName:$scope.lName, tittle:$scope.tittle, gender:$scope.gender, age:$scope.age}, $scope);
  };

  $scope.$watch('passw1',function() {myService.test($scope);});
  $scope.$watch('passw2',function() {myService.test($scope);});
  $scope.$watch('fName', function() {myService.test($scope);});
  $scope.$watch('lName', function() {myService.test($scope);});

});

app.controller('editCtrl', function($scope, $routeParams, myService) {
  $scope.id = $routeParams.id;
  myService.getUserById($scope.id, $scope);
  console.log("in edit" +" " + $scope.id);
  console.log($scope);

  $scope.error = false;
  $scope.incomplete = true; 

  $scope.$watch('user', function() {    
    $scope.fName = $scope.user.fName;
    $scope.lName = $scope.user.lName;
    $scope.tittle = $scope.user.tittle;
    $scope.age = $scope.user.age;
    $scope.gender = $scope.user.gender;
  });

  $scope.$watch('passw1',function() {myService.test($scope);});
  $scope.$watch('passw2',function() {myService.test($scope);});
  $scope.$watch('fName', function() {myService.test($scope);});
  $scope.$watch('lName', function() {myService.test($scope);});

  $scope.editUser = function (){
    console.log("in editUser");
    console.log($scope);

    myService.updateUser($scope);
  } 
});
