'use strict';

var myModule = angular.module('indelibleApp');

myModule.directive('noBackspace', function($document) {
  return function(scope) {
    $document.keydown(function(evt) {
      var key = evt.which;

      if(key === 8 && scope.content.substr(scope.content.length - 1) === ' ')
      {
        scope.$apply(function(){ scope.content = scope.content.substr(0, scope.content.length - 1); });
      }
      else if(key === 8)
      {
        evt.preventDefault();
      }
    });
  };
});

