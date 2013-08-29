'use strict';

var myModule = angular.module('indelibleApp');

myModule.directive('textarea', function($document, Typertimer, Maps, Session) {
    return function($scope) {


      $scope.total_words = 0;

      function handleKey(evt) {
				var character;
        character = null;
        var key = evt.which;

        if(key === 8)
        {
          $scope.page.try_backspace()
        }
        else
        {
          character = Maps.getKey(key);
        }

        if(Typertimer.can_type() && character)
        {
          Typertimer.update();
          $scope.page.add_character(character);
        }
				$scope.total_words = $scope.page.calculate_word_count();
      };

      if (true || $scope.page.is_owned_by_current_user()) {
        $document.keypress(function(evt) {
          handleKey(evt);
        });


        // Handle backspacing and tabbing
        $document.keydown(function(evt) {
          var key = evt.which;

          if(key === 8 || key === 9)
          {
            evt.preventDefault();
            handleKey(evt);
          }
        });

        $scope.$on('$destroy', function() {
          $document.off('keypress');
          $document.off('keydown');
        });
      }
    };
  }
);

myModule.$inject = ['$document', 'Typertimer', 'Maps', 'Session'];
