'use strict';

var myModule = angular.module('indelibleApp.controllers');

myModule.controller('MainCtrl', function ($scope, Page, Session) {
    $scope.content = '';
    $scope.pages = Page.query();
    $scope.isSignedIn = Session.loggedIn;
    $scope.user = Session.currentUser;
  });
myModule.$inject = ['$scope', 'Page', 'Session'];