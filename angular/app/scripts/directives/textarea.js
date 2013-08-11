'use strict';

var myModule = angular.module('indelibleApp');

myModule.directive('textarea', function($document, Typertimer) {
    return function($scope) {
      var character,
        whiteMap = { 13: '<br>', 9: '&nbsp;&nbsp;&nbsp;&nbsp;', 32: ' ', nbsp: '&nbsp;' },
        inkMap = { 60: '&lt;', 62: '&gt;' };

      $scope.total_words = 0;

      function handleKey(evt) {
          var key = evt.which;

          if(typeof whiteMap[key] != 'undefined')
            character = whiteMap[key];
          else if(typeof inkMap[key] != 'undefined')
            character = inkMap[key];
          else
            character = String.fromCharCode(key);

          if(Typertimer.can_type())
          {
            Typertimer.update();
            var wc = wordCount($scope.page.content);
            $scope.total_words = (wc > $scope.total_words) ? wc : $scope.total_words;
            $scope.page.content += character;
          }
      };

      function deleteWord()
      {
        var content = $scope.page.content;

        if(wordCount(content) == $scope.total_words)
        {
          $scope.page.content = content.substr(0, content.length - $scope.last_word_length);
        }
      }

      function deleteWhitespace()
      {
        var content = $scope.page.content;

        for(var k in whiteMap)
        {
          var w = whiteMap[k];
          if(content.substr(content.length - w.length) === w)
          {
            $scope.$apply(function(){ $scope.page.content = content.substr(0, content.length - w.length); });
            return true;
          }
        }
        return false;
      }

      function wordCount(s)
      {
        for(var k in whiteMap)
        {
          var w = whiteMap[k];
          w = new RegExp(w, "g");
          s = s.replace(w, ' ');
        }
        s = s.replace(/\s+/g, ' ');
        s = s.split(' ');
        $scope.last_word_length = s[(s.length - 1)].length;

        return s.length;
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

myModule.$inject = ['$document', 'Typertimer'];