'use strict';

angular.module('indelibleApp', [])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            })
            .when('/lol', {
                templateUrl: 'views/lol.html',
                controller: 'LolCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    });
