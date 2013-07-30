angular.module('indelibleApp.controllers').controller('SessionsController', ['$scope', '$location', '$cookieStore', 'Session', function($scope, $location, $cookieStore, Session) {

  $scope.session = Session.userSession;

  $scope.create = function() {

    if ( Session.signedOut ) {
      $scope.session.$save()
        .success(function(data, status, headers, config) {
          $cookieStore.put('_indelible_session', data);
        });
    }

  };

  $scope.destroy = function() {
    $scope.session.$destroy();
  };

}]);