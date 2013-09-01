'use strict';

var myModule = angular.module('indelibleApp.controllers');

myModule.controller('MainController', function ($scope, $location, $rootScope, Page, Session, Flash) {
      if(Session.loggedIn)
      {
        Flash.hold();
        $location.path($rootScope.path('PagesController'));
      }
      else
      {
        $scope.page = new Page({ content: '', new: true });
      }
  });
myModule.$inject = ['$scope', '$location', '$rootScope', 'Page', 'Session', 'Flash'];