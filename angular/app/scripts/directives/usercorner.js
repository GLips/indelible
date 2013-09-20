'use strict';

var myModule = angular.module('indelibleApp');

myModule.directive('usercorner', function(Session, $location) {
    return function($scope) {
      $scope.session = Session;

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