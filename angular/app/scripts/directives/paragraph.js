'use strict';

var myModule = angular.module('indelibleApp');

myModule.directive('paragraph', function($compile, Parser) {
  return {
    scope: {
      paragraph: '=paragraph',
      mode: '=?mode',
      last: '=?lastParagraph'
    },
    link: function($scope, $element) {
      $scope.mode = ($scope.mode) ? $scope.mode : Parser.HIGHLIGHT;

      $scope.rebuild = function() {
        if(angular.isDefined($scope.paragraph)) {
          var last_point = 0,
            clean = $scope.paragraph.content;
          $element.html('');
          if($scope.mode == Parser.HIGHLIGHT && angular.isArray($scope.paragraph.marks)) {
            $scope.paragraph.marks.forEach(function(mark) {
              $element.append(clean.slice(last_point, mark.start));
              last_point = mark.start;
              $element.append('<span class="mark">' + clean.slice(last_point, mark.start + mark.range) + '</span>');
              last_point += mark.range;
            });
          }

          $element.append(clean.slice(last_point, clean.length));
          if($scope.last && $scope.$parent.page.is_owned_by_current_user()) {
            $element.append("<wbr><span class='editor-cursor' data-blinker>|</span>");
          }
          $compile($element.contents())($scope);
        }
      }
      $scope.$watch('paragraph.content', function(){ $scope.rebuild(); });
      $scope.$watch('paragraph.marks.length', function(){ $scope.rebuild(); });
      $scope.$watch('mode', function(){ $scope.rebuild(); });
    }
  };
});

myModule.$inject = ['$compile', 'Parser'];