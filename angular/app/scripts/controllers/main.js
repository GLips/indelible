'use strict';

var myModule = angular.module('indelibleApp.controllers');

myModule.controller('MainCtrl', function ($scope, $location, $rootScope, Page, Session) {
//    Page.query();
      if(Session.loggedIn)
      {
        $location.path($rootScope.path('PagesController'));
      }
  });
myModule.$inject = ['$scope', '$location', 'Page', 'Session'];