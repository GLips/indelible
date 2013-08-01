angular.module('indelibleApp.controllers').controller('SessionsController', ['$scope', '$rootScope', '$location', '$cookieStore', 'Session', function($scope, $rootScope, $location, $cookieStore, Session) {

  $scope.session = Session.userSession;

  $scope.create = function() {

    if ( Session.loggedOut ) {
      $scope.session.$save()
        .success(function(data, status, headers, config) {
          if(typeof data.flashes != 'undefined' && typeof data.flashes.errors != 'undefined')
          {
            $rootScope.flashes = data.flashes;
          }
          else
          {
            $rootScope.flashes = null;
            $cookieStore.put('_indelible_session', data);
            Session.login(data);
            $location.path('/');
          }
        });
    }

  };

}]);