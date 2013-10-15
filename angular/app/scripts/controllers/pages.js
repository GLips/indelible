var myModule = angular.module('indelibleApp.controllers');

myModule.controller('PagesController', function($scope, $location, $route, $routeParams, $rootScope, Session, Flash, Page, $analytics) {
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
    $scope.page = new Page({new: true});
    $scope.page.clear();
    $scope.page.init();
    $scope.function = $scope.create;
  };

  $scope.view = function() {
    Page.get({id: $routeParams.id}, function(data) {
      if(Flash.no_errors())
      {
        $scope.page = new Page(data.page);
        $scope.page.init();
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
    var word_count = $scope.get_approximate_word_count();
    Flash.clear();
    $scope.page.$save(function(data) {
      if(Flash.no_errors())
      {
        $analytics.eventTrack("New Page", { word_count: word_count });
        $location.path($rootScope.path('PagesController'));
        Page.saved_page = data.saved_page;
        Page.saved_message = "Stored "+ $scope.total_words +" words";
        Flash.hold();
      } else {
        $scope.page = new Page(data.page);
      }
    });
  };

  $scope.update = function() {
    var word_count = $scope.get_approximate_word_count();
    Flash.clear();
    $scope.page.$update(function(data) {
      if(Flash.no_errors())
      {
        $analytics.eventTrack("Update Page", { word_count: word_count });
        $location.path($rootScope.path('PagesController'));
        Page.saved_page = data.saved_page;
        var verb = (data.is_public) ? "Published" : "Stored";
        Page.saved_message = verb +" "+ $scope.total_words +" words";
        Flash.hold();
      } else {
        $scope.page = new Page(data.page);
      }
    }, function(error) { console.log('Update error: ' + error); });
  };

  $scope.destroy = function() {
    $scope.page.$destroy();
  };

  $scope.get_approximate_word_count = function() {
    var wc = $scope.page.get_word_count();
    if(wc < 100)
      wc = "0-100";
    else if(wc < 250)
      wc = "100-250";
    else if(wc < 500)
      wc = "250-500";
    else if(wc < 750)
      wc = "500-750";
    else if(wc < 1000)
      wc = "750-1000";
    else
      wc = "1000+";

    return wc;
  }

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

myModule.$inject = ['$scope', '$location', '$route', '$routeParams', '$rootScope', 'Session', 'Flash', 'Page', '$analytics'];
