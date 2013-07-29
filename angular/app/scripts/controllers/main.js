'use strict';

var myModule = angular.module('indelibleApp');

myModule
  .controller('MainCtrl', function ($scope, Page) {
    $scope.content = '';
    $scope.pages = Page.query();
  });
myModule.$inject = ['$scope', 'Page'];