var myModule = angular.module('indelibleApp.controllers');

myModule.controller('PagesController', function($scope, $location, $route, $routeParams, $rootScope, Session, Flash, Page) {
  var actions = ['index', 'new', 'view'];
  var action = $route.current.$$route.action;

  $scope.index = function() {
    $scope.now = Date.now();
    $scope.pages = Page.get(function(data) {
      if(typeof Page.saved_page != 'undefined' && typeof data.pages != 'undefined')
      {
        var p = $.grep(data.pages, function(e) { return e.id == Page.saved_page });
        p[0].saved = true;
        p[0].saved_message = Page.saved_message;
        delete Page.saved_message;
        delete Page.saved_page;
      }
      $scope.pages = data.pages;
    });
  };

  $scope.new = function() {
    $scope.page = new Page({content: ''});
    Page.original_word_count = $scope.page.calculate_word_count();
    $scope.function = $scope.create;
  };

  $scope.view = function() {
    Page.get({id: $routeParams.id}, function(data) {
      if(Flash.no_errors())
      {
        $scope.page = new Page(data.page);
				$scope.page.calculate_word_count();
        $scope.total_words = $scope.page.get_word_count();
        $scope.word_count = 0;
      }
      else
      {
        Flash.hold();
        $location.path($rootScope.path('MainController'));
      }
    });
    $scope.function = $scope.update;
  };

  $scope.create = function() {
    $scope.page.$save(function(data) {
      $scope.page = new Page(data.page);
      if(Flash.no_errors())
      {
        $location.path($rootScope.path('PagesController'));
        Page.saved_page = data.saved_page;
        Page.saved_message = "Stored "+ $scope.total_words +" words";
        Flash.hold();
      }
    });
  };

  $scope.update = function() {
    $scope.page.$update(function(data) {
      if(Flash.no_errors())
      {
        $location.path($rootScope.path('PagesController'));
        Page.saved_page = data.saved_page;
        var verb = (data.is_public) ? "Published" : "Stored";
        Page.saved_message = verb +" "+ $scope.total_words +" words";
        Flash.hold();
      }
    }, function(error) { console.log('Update error: ' + error); });
  };

  $scope.destroy = function() {
    $scope.page.$destroy();
  };




  $scope.openView = function(event, id) {
    // Detect middle click
    if (event.which == 2 || (event.ctrlKey || event.metaKey))
      return
    else
      $location.path('pages/' + id);
  }

  if(actions.indexOf(action) != -1)
    $scope[action]();


});

myModule.$inject = ['$scope', '$location', '$route', '$routeParams', '$rootScope', 'Session', 'Flash', 'Page'];
