var myModule = angular.module('indelibleApp.controllers');

myModule.controller('UsersController', function($scope, $route, $location, $rootScope, UserSubscription, Flash, Session) {
  var actions = ['index'];
  var action = $route.current.$$route.action;

  $scope.index = function() {
    $scope.current_user = Session.currentUser;
    $scope.subscription_errors = '';
    UserSubscription.get(function(data) {
      $scope.subscription = data.subscription
    });
    $scope.show_form = false;
  };

  $scope.subscribe = function() {
    var form = $('#subscription_form');
    Stripe.createToken(form, $scope.stripeResponseHandler);
  };

  $scope.unsubscribe = function() {
    UserSubscription.delete(function(data) {
      $scope.subscription = data.subscription
    });
  };

  $scope.show_subscription = function() {
    $scope.show_form = true;
  }

  $scope.stripeResponseHandler = function(status, response) {
    if(response.error) {
      $scope.$apply($scope.subscription_errors = response.error.message);
    } else {
      $scope.$apply($scope.subscription_errors = '');
      var sub = new UserSubscription({ stripeToken: response.id });
      $scope.$apply(sub.$save()
        .success(function(data) {
          if(Flash.no_errors() && typeof data.subscription != 'undefined')
          {
            Flash.hold();
            $scope.subscription = data.subscription;
            $location.path($rootScope.path('PagesController'));
          }
        })
      );
    }
  }

  if(actions.indexOf(action) != -1)
    $scope[action]();
});

myModule.$inject = ['$scope', '$route', '$location', '$rootScope', 'UserSubscription', 'Flash', 'Session'];