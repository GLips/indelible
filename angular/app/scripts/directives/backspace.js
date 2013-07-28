var myModule = angular.module('indelibleApp');

myModule.directive('noBackspace', function($document) {
    return function(scope, elm, attrs) {
        $document.keydown(function(evt) {
            key = evt.which
            if(key == 8)
                evt.preventDefault()
        });
    }
});

