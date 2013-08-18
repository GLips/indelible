'use strict';

var myModule = angular.module('indelibleApp.controllers');

myModule.controller('MainCtrl', function ($scope, $location, $rootScope, Page, Session) {
      if(Session.loggedIn)
      {
        $location.path($rootScope.path('PagesController'));
      }
      else
      {
        $scope.page = new Page({ content: '' });
      }
  });
myModule.$inject = ['$scope', '$location', '$rootScope', 'Page', 'Session'];