'use strict';

var myModule = angular.module('indelibleApp.resources');

myModule.factory ('Collection', function($resource) {
  var collection = function(name) {
    return $resource(apiPrefix + '/'+ name +'/:id', {id: '@id'}, { update: { method: 'PUT' } });
  }

  return collection;
});

myModule.$inject = ['$resource'];
