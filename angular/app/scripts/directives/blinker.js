var myModule = angular.module('indelibleApp');

myModule.directive('blinker', function($timeout) {
    return function(scope, elm, attrs) {
        var timeoutId,
            shown = true;

        function init() {
            timeoutId = $timeout(function() {
                blink();
                init();
            }, 500);
        }

        function blink() {
            if(shown)
                elm.hide();
            else
                elm.show();
            shown = !shown;
        }

        elm.bind('$destroy', function() {
            $timeout.cancel(timeoutId);
        });

        init();
    }
});
