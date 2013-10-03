'use strict';

var myModule = angular.module('indelibleApp');

myModule.directive('highlight', function($document, Marks, Parser, Range) {
  return {
    link: function($scope, $element) {

      $element.mousedown(function() {
        var selection = window.getSelection(),
          scope = angular.element($element).scope();
        scope.mode = Parser.NEW;
        this.el = $element;
      });

      $element.mouseup(function() {
        var selection = window.getSelection(),
          scope = angular.element($element).scope();
        if(selection.type == "Range" && angular.isDefined(scope.paragraph)) {
          var start = (selection.anchorOffset < selection.focusOffset) ? selection.anchorOffset : selection.focusOffset,
            end = (selection.anchorOffset > selection.focusOffset) ? selection.anchorOffset : selection.focusOffset;
          scope.paragraph.add_range(new Range({ start: start, end: end, range: (end - start) }));
        }
        scope.mode = Parser.HIGHLIGHT;
      })


      $scope.$on('$destroy', function() {
        $document.off('mouseup');
        $document.off('mousedown');
      });
    }
  }
});

myModule.$inject = ['$document', 'Marks', 'Parser', 'Range'];

String.prototype.splice = function( idx, rem, s ) {
  return (this.slice(0,idx) + s + this.slice(idx + Math.abs(rem)));
};