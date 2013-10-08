'use strict';

var myModule = angular.module('indelibleApp');

myModule.directive('parser', function($compile, Parser) {
  return {
    scope: {
      page: '=page',
      mode: '=?mode'
    },
    link: function($scope, $element) {

      $scope.rebuild = function() {
        $scope.mode = ($scope.mode) ? $scope.mode : Parser.HIGHLIGHT;
        $element.html('');
        if(angular.isDefined($scope.page)) {
          $scope.page.paragraphs.data.forEach(function(p, index) {
            if(index == $scope.page.paragraphs.data.length - 1) {
              $element.append("<p data-paragraph='page.paragraphs.data["+ index  +"]' data-last-paragraph='true'></p>");
            } else {
              $element.append("<p data-paragraph='page.paragraphs.data["+ index  +"]'></p>");
            }
          });
        }
        $compile($element.contents())($scope);
      }

      $scope.$watch('page.paragraphs.data.length', function(){ $scope.rebuild(); });
    }
  };
});

myModule.$inject = ['$compile', 'Parser'];