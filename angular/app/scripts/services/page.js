'use strict';

var myModule = angular.module('indelibleApp.services');

myModule.factory ('Page', function($resource) {
  return $resource(apiPrefix + '/pages/:id', {id: '@id'})
});