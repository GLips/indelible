var myModule = angular.module('indelibleApp.controllers');

myModule.controller('RegistrationsController', function($scope, $location, Session, Flash, $cookieStore) {

  $scope.registration = Session.userRegistration;

  $scope.create = function() {
    $scope.registration.$save()
      .success(function(data, status, headers, config) {
        if(Flash.no_errors() && typeof data.resource != 'undefined')
        {
          $cookieStore.put('_indelible_session', data.resource);
          Session.login(data.resource);
          $location.path('/pages/new');
        }
      });
  };

  $scope.destroy = function() {
    $scope.registration.$destroy();
  };

});

myModule.$inject = ['$scope', '$location', 'Session', 'Flash', '$cookieStore'];