'use strict';

var myModule = angular.module('indelibleApp.controllers');

myModule.controller('MainCtrl', function ($scope, Page) {
    $scope.content = '';
    $scope.pages = Page.query();
  });
myModule.$inject = ['$scope', 'Page'];