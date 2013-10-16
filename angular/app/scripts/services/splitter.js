'use strict';

var myModule = angular.module('indelibleApp.services');

myModule.factory('Splitter', function($cookieStore) {
  var splitter = function(name, variations) {
    this.name = name;
    this.variations = variations;
  };

  splitter.prototype.check_test = function() {
    var result = $cookieStore.get(this.name),
        mixpanel_object = {};
    if(!result) {
      result = this.get_random_test();
      $cookieStore.put(this.name, result);
    }
    mixpanel_object[this.name] = result;
    mixpanel.register(mixpanel_object);
    return result;
  };

  splitter.prototype.get_random_test = function() {
    return this.variations[Math.floor(Math.random() * this.variations.length)];
  }

  return { getInstance: function(name, variations) { return new splitter(name, variations); } }

});

myModule.$inject = ['$cookieStore'];