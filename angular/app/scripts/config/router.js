App.config(function ($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      templateUrl: '/views/main.html',
      controller: 'MainCtrl'
    })
    .when('/register', {
      templateUrl: '/views/users/new.html',
      controller: 'RegistrationsController'
    })
    .when('/log_in', {
      templateUrl: '/views/sessions/new.html',
      controller: 'SessionsController'
    })
    .when('/log_out', {
      templateUrl: '/views/sessions/destroy.html',
      controller: 'SessionsController'
    })

    // PAGES
    .when('/pages/new', {
      templateUrl: '/views/pages/new.html',
      controller: 'PagesController'
    })

    .otherwise({
      redirectTo: '/'
    });

  $locationProvider.html5Mode(true);
});
App.$inject = ['$routeProvider', '$locationProvider'];