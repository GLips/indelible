angular.module('indelibleApp.controllers').controller('RegistrationsController', ['$scope', '$location', 'Session', '$rootScope', '$cookieStore', function($scope, $location, Session, $rootScope, $cookieStore) {

  $scope.registration = Session.userRegistration;

  $scope.create = function() {
    $scope.registration.$save()
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
  };

  $scope.destroy = function() {
    $scope.registration.$destroy();
  };

}]);