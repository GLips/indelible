'use strict';

var myModule = angular.module('indelibleApp.resources');

myModule.factory('Marks', function($http, $resource) {
  var Marks = $resource(apiPrefix + '/marks.json');

  Marks.prototype.marks = [
    { start: 1, range: 10, comment: 'Comment #1.' },
    { start: 20, range: 20, comment: 'Comment #2.' },
    { start: 100, range: 2, comment: 'Comment #3.' }
  ];

  return Marks;
});

myModule.$injext = ['$http', '$resource'];