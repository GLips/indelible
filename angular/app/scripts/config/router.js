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
    .when('/sign_in', {
      templateUrl: 'views/sessions/new.html',
      controller: 'SessionsController'
    })
    .otherwise({
      redirectTo: '/'
    });
});