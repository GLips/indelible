'use strict';

var myModule = angular.module('indelibleApp');

myModule.directive('informer', function(Flash) {
  return function($scope) {
    $scope.flash = Flash;
    $scope.types = Flash.types;

    $scope.$watch('flash.data', function() {
      for(var i = 0; i < $scope.types.length; i++)
      {
        $scope[$scope.types[i]] = {};
      }
      for(var type in $scope.flash.data)
      {
          $scope[type] = $scope.flash.data[type];
      }
    });
  };
});
myModule.$inject = ['Flash'];