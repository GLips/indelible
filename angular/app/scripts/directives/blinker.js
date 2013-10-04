'use strict';

var myModule = angular.module('indelibleApp');

myModule.directive('blinker', function($timeout) {
  return function($scope, elm) {
      var timeoutId,
        shown = false;

      function init() {
        timeoutId = $timeout(function() {
          blink();
          init();
        }, 500);
      }

      function blink() {
        if(shown)
        {
          elm.css('visibility', 'hidden');
        }
        else
        {
          elm.css('visibility', 'visible');
        }
        shown = !shown;
      }

      elm.bind('$destroy', function() {
        $timeout.cancel(timeoutId);
      });

      init();
  };
});

myModule.$inject = ['$timeout'];