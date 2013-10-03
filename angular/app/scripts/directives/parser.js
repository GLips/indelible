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
        $scope.page.paragraphs.data.forEach(function(p, index) {
          $element.append("<p name='"+ p.name +"' data-paragraph='page.paragraphs.data["+ index  +"]' data-highlight></p>");
        });
        $compile($element.contents())($scope);
      }

      $scope.$watch('page.paragraphs.data.length', function(){ $scope.rebuild(); });
    }
  };
});

myModule.$inject = ['$compile', 'Parser'];