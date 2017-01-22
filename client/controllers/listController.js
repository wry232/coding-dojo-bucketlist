app.controller('listController',
  ['$scope', '$rootScope', '$location', 'userFactory','$routeParams',

    function($scope, $rootScope, $location, userFactory, $routeParams) {

    $scope.getAllBuckets = function() {
      var taggee = $scope.user;
      userFactory.getAllBuckets(taggee.name, function(buckets) {
        buckets.forEach(function(bucket) {
          bucket.createdAt = moment(bucket.createdAt).format("MMM DDD, YYYY");
        });

        // DONE
        $scope.buckets1 = buckets.filter(function(bucket){
          var isTagger = bucket.tagger && bucket.tagger._id === $scope.user._id;
          var isTaggee = bucket.taggee && bucket.taggee._id === $scope.user._id;
          // DONE
          if (isTagger || isTaggee) {
            return bucket.state === true;
          }
          return false;
        })

        // PENDING
        $scope.buckets2 = buckets.filter(function(bucket){
          var isTagger = bucket.tagger && bucket.tagger._id === $scope.user._id;
          var isTaggee = bucket.taggee && bucket.taggee._id === $scope.user._id;
          // PENDING
          if (isTagger || isTaggee) {
            return bucket.state === false;
          }
          return false;
        })
      })
    }
    var getUserById = function(id){
      console.log('getUserById', id);

      userFactory.getUserById(id, function(user){
        $scope.user = user;
      });
    }

    $scope.logout = function() {
      console.log('User logged out');
      $rootScope.loggedUser = false;
    }

    $scope.goToDashboard = function (user) {
      console.log('$scope.goToDashboard');
      var url = '/dashboard/';
      $location.url(url);
    };

    var init = function () {
      console.log('init');
      var id = $routeParams.id;
      getUserById(id);
      // $scope.getBucketAsTaggee();
      // $scope.getBucketAsTagger();
      $scope.getAllBuckets();
    }

    init();

}]);
