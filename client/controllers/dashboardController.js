app.controller('dashboardController',
  ['$rootScope', '$scope', '$location', 'userFactory','$routeParams',

    function($rootScope, $scope, $location, userFactory, $routeParams) {

    var getUser = function(){
      if (!$scope.user) {
        userFactory.getUser(function(user){
          $scope.user = user;
        });
      }
    }

    var getUsers = function() {
      if (!$scope.users) {
        userFactory.getUsers(function(users){
          $scope.users = users;
        });
      }
    }

    var saveNewBucket = function(newBucket, callback) {
      userFactory.createBucketByName(newBucket, function(){
        console.log('reset newBucket value');
        $scope.newBucket = {};
        callback();
      });
    }

    $scope.createNewBucket = function() {
      console.log('$scope.newBucket', $scope.newBucket);
      console.log('$scope.user', $scope.user);
      console.log('$scope.taggee', $scope.taggee);

      // Validation:
      // check 5 characters for title and 10 for description
      if ($scope.newBucket === undefined) {
        alert('Must enter title and description');
        return;
      }

      if ($scope.newBucket.title === undefined) {
        alert('Title must be present');
        return;
      }

      if ($scope.newBucket.title && $scope.newBucket.title.length < 5) {
        alert('Title must be 5 characters');
        return;
      }

      if ($scope.newBucket.description === undefined) {
        alert('Description must be present');
        return;
      }

      if ($scope.newBucket.description && $scope.newBucket.description.length < 10) {
        alert('Description must be 10 characters');
        return;
      }

      // check taggee is available or not
      // if ($scope.taggee === undefined) {
      //   alert('Must tag a friend');
      //   return;
      // }

      var newBucket = angular.extend({}, {
        tagger: $scope.user,
        taggee: $scope.taggee,
      }, $scope.newBucket);

      saveNewBucket(newBucket, function() {
        $scope.getAllBuckets();
        alert('Added to bucket list');
      });
    }

    $scope.logout = function() {
      console.log('User logged out');
      $rootScope.loggedUser = false;
    }

    $scope.removeUserSelf = function(user) {
      return $scope.user.name !== user.name;
    }

    $scope.goToUser = function (user) {
      console.log('$scope.goToUser');
      var url = '/user/' + user._id;
      $location.url(url);
    };

    $scope.goToDashboard = function (user) {
      console.log('$scope.goToDashboard');
      var url = '/dashboard/';
      $location.url(url);
    };

    $scope.getAllBuckets = function() {
      var taggee = $scope.user;
      userFactory.getAllBuckets(taggee.name, function(buckets) {
        buckets.forEach(function(bucket) {
          bucket.createdAt = moment(bucket.createdAt).format("MMM DDD, YYYY");
        });

        //tagger
        $scope.buckets1 = buckets.filter(function(bucket){
          return bucket.tagger && bucket.tagger._id === $scope.user._id;
        })

        // taggee
        $scope.buckets2 = buckets.filter(function(bucket){
          return bucket.taggee && bucket.taggee._id === $scope.user._id;
        })
      })
    }

    $scope.toggleStateOfBucket = function(bucket) {
      console.log('bucket', bucket);
      userFactory.toggleStateOfBucket(bucket, function(bucket) {
        console.log('returned bucket', bucket);
      });
    }

    var init = function () {
      console.log('init');
      getUser();
      getUsers();
      $scope.getAllBuckets();
    }

    init();

}]);
