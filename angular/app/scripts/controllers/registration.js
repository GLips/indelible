angular.module('indelibleApp.controllers').controller('RegistrationsController', ['$scope', '$location', 'Session', function($scope, $location, Session) {

  $scope.registration = Session.userRegistration;
  $scope.errors = ['lol', 'lk'];

  $scope.create = function() {
    var result = $scope.registration.$save();
    $scope.errors = result;
  };

  $scope.destroy = function() {
    $scope.registration.$destroy();
  };

}]);