'use strict';

var myModule = angular.module('indelibleApp');

myModule.directive('greenlight', function($timeout, Typertimer) {
  return function($scope, elm) {
    var timeoutId;
    $scope.width = 10;

    function init() {
      timeoutId = $timeout(function() {
        update_length();
        init();
      }, 5);
    }

    function update_length() {
      $scope.width = Typertimer.percent() * 100;
    }

    elm.bind('$destroy', function() {
      $timeout.cancel(timeoutId);
    });

    init();
  };
});

myModule.$inject = ['$timeout', 'Typertimer'];
