'use strict';

var myModule = angular.module('indelibleApp');

myModule.directive('textarea', function($document, Typertimer, Maps) {
    return function($scope) {
      var character;

      $scope.total_words = 0;

      function handleKey(evt) {
          var key = evt.which;

          if(typeof Maps.whiteMap[key] != 'undefined')
            character = Maps.whiteMap[key];
          else if(typeof Maps.inkMap[key] != 'undefined')
            character = Maps.inkMap[key];
          else
            character = String.fromCharCode(key);

          if(Typertimer.can_type())
          {
            Typertimer.update();
            var wc = $scope.page.calculate_word_count();
            $scope.total_words = (wc > $scope.total_words) ? wc : $scope.total_words;
            $scope.page.content += character;
          }
      };

      function deleteWord()
      {
        var content = $scope.page.content;

        if($scope.page.calculate_word_count() == $scope.total_words)
        {
          $scope.page.content = content.substr(0, content.length - $scope.page.last_word_length);
        }
      }

      function deleteWhitespace()
      {
        var content = $scope.page.content;

        for(var k in Maps.whiteMap)
        {
          var w = Maps.whiteMap[k];
          if(content.substr(content.length - w.length) === w)
          {
            $scope.$apply(function(){ $scope.page.content = content.substr(0, content.length - w.length); });
            return true;
          }
        }
        return false;
      }

      $document.keypress(function(evt) {
        if(true)
        {
          handleKey(evt);
        }
      });


      // Handle backspacing and tabbing
      $document.keydown(function(evt) {
        var key = evt.which;

        if(key === 8)
        {
          if(!deleteWhitespace()){
            deleteWord();
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

myModule.$inject = ['$document', 'Typertimer', 'Maps'];