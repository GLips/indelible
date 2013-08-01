'use strict';

var myModule = angular.module('indelibleApp');

myModule.directive('usercorner', function(Session, $location, $rootScope) {
    return function($scope) {
      $scope.session = Session;

      if($scope.session.loggedIn)
      {
        var email = $scope.session.getEmail();
        $scope.content = "Welcome, " + email.substr(0, email.indexOf('@'));
      }
      else
      {
        $scope.content = "";
      }

      $scope.destroy = function() {
        $scope.session.userSession.$destroy()
          .success(function(data) {
            if(data.logged_out)
            {
              Session.logout();
              $location.path('/');
            }
            else
            {
              $rootScope.flashes = { errors: ['There was an issue logging out, try again.'] };
            }
          });
      };

    };
  }
);
myModule.$inject = ['Session', '$location'];