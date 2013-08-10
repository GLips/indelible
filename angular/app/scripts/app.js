'use strict';

angular.module('indelibleApp.resources', ['ngResource']);
angular.module('indelibleApp.services', ['ngResource']);
angular.module('indelibleApp.directives', []);
angular.module('indelibleApp.filters', []);
angular.module('indelibleApp.controllers', ['ngCookies']);

var App = angular.module('indelibleApp', ['ngResource', 'ngSanitize', 'indelibleApp.services', 'indelibleApp.resources', 'indelibleApp.controllers']);

App.run(function($route, $rootScope, $location)
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