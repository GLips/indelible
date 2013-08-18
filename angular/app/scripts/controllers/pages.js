var myModule = angular.module('indelibleApp.controllers');

myModule.controller('PagesController', function($scope, $location, $route, $routeParams, $rootScope, Session, Flash, Page) {
  var actions = ['index', 'new', 'view'];
  var action = $route.current.$$route.action;

  $scope.index = function() {
    $scope.pages = Page.get(function(data){
      if(typeof this != 'undefined' && typeof this.saved_page != 'undefined' && typeof data.pages != 'undefined')
      {
        var p = $.grep(data.pages, function(e) { return e.id == this.saved_page });
        p[0].saved = true;
        p[0].saved_message = this.saved_message;
        delete this.saved_message;
        delete this.saved_page;
      }
      $scope.pages = data.pages;
    });
  };

  $scope.new = function() {
    $scope.page = new Page({content: ''});
    $scope.page.calculate_word_count();
    $scope.function = $scope.create;
  };

  $scope.view = function() {
    Page.get({id: $routeParams.id}, function(data) {
      if(Flash.no_errors())
      {
        $scope.page = new Page(data.page);
        $scope.total_words = $scope.page.calculate_word_count();
        $scope.word_count = 0;
      }
      else
      {
        Flash.hold();
        $location.path($rootScope.path('PagesController'));
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
        Flash.hold();
      }
    });
  };

  $scope.update = function() {
    $scope.page.$update(function(data) {
      if(Flash.no_errors())
      {
        this.saved_page = data.saved_page;
        this.saved_message = "Stored "+ $scope.total_words +" words";
        $location.path($rootScope.path('PagesController'));
        Flash.hold();
      }
    });
  };

  $scope.destroy = function() {
    $scope.page.$destroy();
  };


  if(actions.indexOf(action) != -1)
    $scope[action]();


});

myModule.$inject = ['$scope', '$location', '$route', '$routeParams', '$rootScope', 'Session', 'Flash', 'Page'];