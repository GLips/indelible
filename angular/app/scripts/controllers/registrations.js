var myModule = angular.module('indelibleApp.controllers');

myModule.controller('RegistrationsController', function($scope, $location, Session, Flash, $cookieStore, $analytics) {

  $scope.registration = Session.userRegistration;

  $scope.create = function() {
    $scope.registration.$save()
      .success(function(data, status, headers, config) {
        if(Flash.no_errors() && typeof data.resource != 'undefined')
        {
          $cookieStore.put('_indelible_session', data.resource);
          Session.login(data.resource);
          mixpanel.people.set({
            "$email": data.resource.email,
            "$created": data.resource.created_at,
            "$last_login": new Date(),
            "Plan": "Trial"
          });
          mixpanel.alias(data.resource.email);
          $analytics.eventTrack('Registration');
          $location.path('/pages/new');
        }
      });
  };

  $scope.destroy = function() {
    $scope.registration.$destroy();
  };

});

myModule.$inject = ['$scope', '$location', 'Session', 'Flash', '$cookieStore', '$analytics'];