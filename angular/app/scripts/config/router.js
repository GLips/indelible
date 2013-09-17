App.config(function ($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      templateUrl: '/views/main.html',
      title: 'Pen and paper for the Internet',
      controller: 'MainController'
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
    .when('/pages/:id', {
      templateUrl: '/views/pages/new.html',
      action: 'view',
      title: 'View Page',
      controller: 'PagesController'
    })

    // Users
    .when('/users/account', {
      templateUrl: '/views/users/index.html',
      action: 'index',
      title: 'Edit Your Profile',
      controller: 'UsersController'
    })

    .otherwise({
      redirectTo: '/'
    });

  $locationProvider.html5Mode(true);
});
App.$inject = ['$routeProvider', '$locationProvider'];