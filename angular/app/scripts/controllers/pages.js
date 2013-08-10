var myModule = angular.module('indelibleApp.controllers');

myModule.controller('PagesController', function($scope, $location, $route, $routeParams, $rootScope, Session, Flash, Page) {
  var actions = ['index', 'new', 'view'];
  var action = $route.current.$$route.action;

  $scope.index = function() {
    $scope.pages = Page.get(function(data){
      $scope.pages = data.pages;
    });
  };

  $scope.new = function() {
    $scope.page = new Page({content: ''});
    $scope.function = $scope.create;
  };

  $scope.view = function() {
    Page.get({id: $routeParams.id}, function(data) {
      $scope.page = new Page(data.page);
    });
    $scope.function = $scope.update;
  };

  $scope.create = function() {
    $scope.page.$save(function(data) {
      $scope.page = new Page(data.page);
      if(Flash.no_errors())
      {
        $location.path($rootScope.path('PagesController'));
        Flash.hold_flash();
      }
    });
  };

  $scope.update = function() {
    $scope.page.$update(function() {
      if(Flash.no_errors())
      {
        $location.path($rootScope.path('PagesController'));
        Flash.hold_flash();
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