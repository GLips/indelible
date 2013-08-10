angular.module('indelibleApp.controllers').controller('PagesController', ['$scope', '$location', 'Session', 'Flash', 'Page', function($scope, $location, Session, Flash, Page) {

  console.log("New page being created");
  $scope.page = new Page({content: ''});

  $scope.create = function() {
    console.log('before');
    console.log($scope.page);
    $scope.page.$save(function(data) {
      console.log('during');
      console.log($scope.page);
      $scope.page = new Page(data.page);
      console.log('after');
      console.log($scope.page);
      if(Flash.no_errors())
      {
        $location.path('/');
        Flash.hold_flash();
      }
    });
  };

  $scope.destroy = function() {
    $scope.page.$destroy();
  };

}]);