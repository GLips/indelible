'use strict';

var myModule = angular.module('indelibleApp');

myModule.directive('usercorner', function(Session, $location) {
    return function($scope) {
      $scope.session = Session;

      $scope.$watch('session.loggedIn', function() {
        if($scope.session.loggedIn)
        {
          var email = $scope.session.getEmail();
          $scope.content = "Welcome, " + email.substr(0, email.indexOf('@'));
        }
        else
        {
          $scope.content = "&nbsp;";
        }
      });

      $scope.destroy = function() {
        $scope.session.userSession.$destroy()
          .success(function(data) {
            if(data.logged_out)
            {
              Session.logout();
              $location.path('/');
            }
          });
      };

    };
  }
);
myModule.$inject = ['Session', '$location'];