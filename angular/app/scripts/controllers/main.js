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
        var x = Splitter.getInstance('name!', ['one', 'two', 'therreeeee!!!']);
        var y = Splitter.getInstance('name dos!', ['one', 'two', 'therreeeee!!!']);
        x.check_test();
        y.check_test();
        x.check_test();
        x.check_test();
        y.check_test();
        console.log(y.check_test());
        $scope.page = new Page({new: true});
        $scope.page.clear();
        $scope.page.init();
        $analytics.eventTrack("View landing page");
      }
  });
myModule.$inject = ['$scope', '$location', '$rootScope', 'Page', 'Session', 'Flash', '$analytics'];