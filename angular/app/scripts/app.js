'use strict';

angular.module('indelibleApp.resources', ['ngResource']);
angular.module('indelibleApp.services', ['ngResource']);
angular.module('indelibleApp.directives', []);
angular.module('indelibleApp.filters', []);
angular.module('indelibleApp.controllers', ['ngCookies']);

var App = angular.module('indelibleApp', ['ngResource', 'ngRoute', 'ngSanitize', 'indelibleApp.services', 'indelibleApp.resources', 'indelibleApp.controllers', 'indelibleApp.filters', 'ui.bootstrap']);

App.run(function($route, $rootScope)
{
  $rootScope.path = function(controller, params)
  {
    // Iterate over all available routes
    for(var path in $route.routes)
    {
      var pathController = $route.routes[path].controller;
      if(pathController == controller)
      {
        var result = path;
        for(var param in params)
        {
          result = result.replace(':' + param, params[param]);
        }
        return result;
      }
    }
    return undefined;
  };
});

App.$inject = ['$route', '$rootScope', '$location'];