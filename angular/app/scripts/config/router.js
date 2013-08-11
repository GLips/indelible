App.config(function ($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      templateUrl: '/views/main.html',
      title: 'Indelible — Make a mark',
      controller: 'MainCtrl'
    })
    .when('/register', {
      templateUrl: '/views/users/new.html',
      title: 'Register',
      controller: 'RegistrationsController'
    })
    .when('/log_in', {
      templateUrl: '/views/sessions/new.html',
      title: 'Log in',
      controller: 'SessionsController'
    })
    .when('/log_out', {
      templateUrl: '/views/sessions/destroy.html',
      title: 'Log out',
      controller: 'SessionsController'
    })

    // PAGES
    .when('/pages', {
      templateUrl: '/views/pages/index.html',
      action: 'index',
      title: 'Your Pages',
      controller: 'PagesController'
    })
    .when('/pages/new', {
      templateUrl: '/views/pages/new.html',
      action: 'new',
      title: 'New Page',
      controller: 'PagesController'
    })
    .when('/page/:id', {
      templateUrl: '/views/pages/new.html',
      action: 'view',
      title: 'View Page',
      controller: 'PagesController'
    })

    .otherwise({
      redirectTo: '/'
    });

  $locationProvider.html5Mode(true);
});
App.$inject = ['$routeProvider', '$locationProvider'];