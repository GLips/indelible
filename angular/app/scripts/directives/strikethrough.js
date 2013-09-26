'use strict';

var myModule = angular.module('indelibleApp');

myModule.directive('strikethrough', function($document, $sce) {
  return function($scope, element) {
    $document.mouseup(function() {
      var selection = window.getSelection(),
          id = element.context.id
      if(selection.anchorNode.parentNode.id == id && selection.focusNode.parentNode.id == id) {
        console.log(selection);
        console.log($scope.page.content);
        $scope.page.content = $scope.page.content.splice(selection.focusOffset,0,"</span>");
        $scope.page.content = $sce.trustAsHtml($scope.page.content.splice(selection.anchorOffset,0,"<span style='text-decoration:line-through;'>"));
      }
    })
  };
});

myModule.$inject = ['$document', '$sce'];

String.prototype.splice = function( idx, rem, s ) {
  return (this.slice(0,idx) + s + this.slice(idx + Math.abs(rem)));
};