'use strict';

var myModule = angular.module('indelibleApp');

myModule.directive('highlight', function($document, Marks, Parser, Range) {
  return {
    link: function($scope, $element) {

      $element.mousedown(function() {
        var scope = angular.element($element).scope();
        scope.mode = Parser.NEW;
      });

      $element.mouseup(function() {
        var selection = window.getSelection(),
          scope = angular.element($element).scope(),
          serial = new XMLSerializer(),
          html_length = serial.serializeToString(selection.getRangeAt(0).cloneContents()).length,
          content = $scope.paragraph.content;

        if(selection.type == "Range" && angular.isDefined(scope.paragraph)) {
          var start = (selection.anchorOffset < selection.focusOffset) ? selection.anchorOffset : selection.focusOffset,
            r = selection.getRangeAt(0).cloneRange(),
            range = html_length,
            end;

          r.setStart(r.endContainer, 0);
          r.setEnd(r.endContainer, start);
          start = serial.serializeToString(r.cloneContents()).length;
          end = start + range;

          if(range <= content.length) {
            scope.paragraph.add_range(new Range({ start: start, end: end, range: range }));
          }
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