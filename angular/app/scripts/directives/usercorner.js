'use strict';

var myModule = angular.module('indelibleApp');

myModule.directive('usercorner', function(Session) {
    return function(scope) {
      var usercorner = scope.usercorner = {};
      usercorner.loggedIn = Session.loggedIn;

      scope.$watch('usercorner.loggedIn', function() {
        if(usercorner.loggedIn)
        {
          var email = Session.currentUser.email;
          usercorner.content = "Welcome, " + email.substr(0, email.indexOf('@'));
        }
        else
        {
          usercorner.content = "";
        }
      });
    };
  }
);
myModule.$inject = ['Session'];