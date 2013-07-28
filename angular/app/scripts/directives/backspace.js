var myModule = angular.module('indelibleApp');

myModule.directive('noBackspace', function() {
    return function(scope, elm, attrs) {
        elm.bind('keydown', function(evt) {
            key = evt.which
            if(key == 8)
                evt.preventDefault()
        });
    }
});

