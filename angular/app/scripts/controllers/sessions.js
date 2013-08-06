var myModule = angular.module('indelibleApp.controllers');

myModule.controller('SessionsController', function($scope, Flash, $location, $cookieStore, Session) {

  $scope.session = Session.userSession;

  $scope.create = function() {

    if ( Session.loggedOut ) {
      $scope.session.$save()
        .success(function(data, status, headers, config) {
          if(Flash.no_errors())
          {
            $location.path('/');
            Flash.hold_flash();
            Session.login(data.resource);
          }
        });
    }

  };

});

myModule.$inject = ['$scope', 'Flash', '$location', '$cookieStore', 'Session'];