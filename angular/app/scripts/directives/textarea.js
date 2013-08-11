'use strict';

var myModule = angular.module('indelibleApp');

myModule.directive('textarea', function($document, Typertimer) {
    return function($scope) {
      var character,
        whiteMap = { 13: '<br>', 9: '&nbsp;&nbsp;&nbsp;&nbsp;', space: ' ', nbsp: '&nbsp;' },
        inkMap = { 60: '&lt;', 62: '&gt;' };

      function handleKey(evt) {
          var key = evt.which,
              do_update = false;

          if(typeof whiteMap[key] != 'undefined')
            character = whiteMap[key];
          else if(typeof inkMap[key] != 'undefined')
          {
            do_update = true;
            character = inkMap[key];
          }
          else
          {
            do_update = true;
            character = String.fromCharCode(key);
          }

          // Make sure angular understands we're updating the scope
          if(Typertimer.can_type())
          {
            Typertimer.update(do_update);
            $scope.$apply(function(){ $scope.page.content += character; });
          }
      };

      $document.keypress(function(evt) {
        if(true)
        {
          handleKey(evt);
        }
      });


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

myModule.$inject = ['$document', 'Typertimer'];