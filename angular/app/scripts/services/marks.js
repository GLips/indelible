'use strict';

var myModule = angular.module('indelibleApp.resources');

myModule.service('Marks', function($http, $resource) {

//  this.data = [];
//
//  this.add_range = function(range) {
//    var included = [],
//      that = this;
//
//    this.data.forEach(function(r) {
//      if(r.has_point(range.start) && r.has_point(range.end)) {
//        range.range = 0;
//      } else if(range.has_point(r.start) && range.has_point(r.end)) {
//        included.push(r);
//      } else if(r.has_point(range.start)) {
//        range.shift_start(r);
//      } else if(r.has_point(range.end)) {
//        range.shift_end(r);
//      }
//    });
//
//    included.forEach(function(r) {
//      that.remove_range(r);
//    });
//
//    if(range.range > 0) {
//      this.data.push(range);
//      this.sort();
//    }
//  };
//
//  this.remove_range = function(r) {
//    this.data.splice(this.data.indexOf(r), 1);
//  };
//
//  this.sort = function() {
//    this.data.sort(function(a, b) {
//      if(a.start < b.start)
//        return -1;
//      if(a.start > b.start)
//        return 1;
//      return 0;
//    });
//  };

});

myModule.$injext = ['$http', '$resource'];