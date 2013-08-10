'use strict';

var myModule = angular.module('indelibleApp');

myModule.directive('textarea', function($document) {
    return function($scope) {
      $document.keypress(function(evt) {
        var key = evt.which;
        // Make sure angular understands we're updating the scope
        $scope.$apply(function(){ $scope.page.content += String.fromCharCode(key); });
      });
    };
  }
);