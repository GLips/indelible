angular.module('indelibleApp.controllers').controller('RegistrationsController', ['$scope', '$location', 'Session', 'Flash', '$cookieStore', function($scope, $location, Session, Flash, $cookieStore) {

  $scope.registration = Session.userRegistration;

  $scope.create = function() {
    $scope.registration.$save()
      .success(function(data, status, headers, config) {
        if(Flash.no_errors())
        {
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