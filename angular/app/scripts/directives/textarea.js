'use strict';

var myModule = angular.module('indelibleApp');

myModule.directive('textarea', function($document) {
    return function($scope) {
      var character,
        whiteMap = { 13: '<br>', 9: '&nbsp;&nbsp;&nbsp;&nbsp;', space: ' ', nbsp: '&nbsp;' },
        inkMap = { 60: '&lt;', 62: '&gt;' };

      function handleKey(evt) {
          var key = evt.which;

          if(typeof whiteMap[key] != 'undefined')
            character = whiteMap[key];
          else if(typeof inkMap[key] != 'undefined')
            character = inkMap[key];
          else
            character = String.fromCharCode(key);

          // Make sure angular understands we're updating the scope
          $scope.$apply(function(){ $scope.page.content += character; });
      };

      $document.keypress(function(evt) { handleKey(evt); });


      // Handle backspacing and tabbing
      $document.keydown(function(evt) {
        var key = evt.which,
            content = $scope.page.content;

        if(key === 8)
        {
          for(var k in whiteMap)
          {
            var w = whiteMap[k];
            if(content.substr(content.length - w.length) === w)
            {
              $scope.$apply(function(){ $scope.page.content = content.substr(0, content.length - w.length); });
              break;
            }
          }
        }

        if(key === 8 || key === 9)
        {
          evt.preventDefault();

          // Tab key isn't picked up by keypress by default
          if(key === 9)
            handleKey(evt);
        }
      });

      $scope.$on('$destroy', function() {
        $document.off('keypress');
        $document.off('keydown');
      });
    };
  }
);