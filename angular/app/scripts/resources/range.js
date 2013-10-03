'use strict';

var myModule = angular.module('indelibleApp.services');

myModule.factory ('Range', function($resource) {
  var range = $resource(apiPrefix + '/marks/:id', {id: '@id'}, { update: { method: 'PUT' } });

  range.prototype.has_point = function(point) {
    return (point >= this.start && point <= this.end);
  }

  range.prototype.shift_start = function(r) {
    this.start = r.end;
    this.calculate_range();
  }

  range.prototype.shift_end = function(r) {
    this.end = r.start;
    this.calculate_range();
  }

  range.prototype.calculate_range = function() {
    this.range = this.end - this.start;
  }

  return range;
});



myModule.$inject = ['$resource', 'Maps', 'Session'];
