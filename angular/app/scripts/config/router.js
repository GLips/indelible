App.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/main.html',
      controller: 'MainCtrl'
    })
    .when('/register', {
      templateUrl: 'views/users/new.html',
      controller: 'RegistrationsController'
    })
    .otherwise({
      redirectTo: '/'
    });
});