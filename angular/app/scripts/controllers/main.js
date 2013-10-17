'use strict';

var myModule = angular.module('indelibleApp.controllers');

myModule.controller('MainController', function ($scope, $location, $rootScope, Page, Session, Flash, $analytics, Splitter) {
      if(Session.loggedIn)
      {
        Flash.hold();
        $location.path($rootScope.path('PagesController'));
      }
      else
      {
        var button_test = Splitter.getInstance('register_button_color', ['control', 'bright_red', 'green', 'blue']),
          result = button_test.check_test();
        if(result == 'control') {
          $scope.button_class = 'control-class';
        } else if(result == 'bright_red') {
          $scope.button_class = 'bright-red-class';
        } else if(result == 'green') {
          $scope.button_class = 'green-class';
        } else {
          $scope.button_class = 'blue-class';
        }
        $scope.page = new Page({new: true});
        $scope.page.clear();
        $scope.page.init();
        $analytics.eventTrack("View landing page");
      }
  });
myModule.$inject = ['$scope', '$location', '$rootScope', 'Page', 'Session', 'Flash', '$analytics', 'Splitter'];