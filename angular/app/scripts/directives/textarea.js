var myModule = angular.module('indelibleApp');

myModule.directive('textarea', function($document) {
    return function(scope, elm, attrs) {
        $document.keypress(function(evt) {
            key = evt.which
            // Make sure angular understands we're updating the scope
            scope.$apply(function(){ scope.content += String.fromCharCode(evt.which); })
        });
    }
});

