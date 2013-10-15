'use strict';

angular.module('indelibleApp.services').service('Typertimer', function() {

  this.last_update = 0;
  this.limit = 0;

  this.update = function() {
    this.last_update = this.getTime();
  };

  this.can_type = function() {
    return (this.getTime() - this.last_update >= this.limit);
  };

  this.percent = function() {
    var num = (this.getTime() - this.last_update) / this.limit;
    if (num > 1) {
      num = 1;
    }
    return num;
  };

  this.getTime = function() {
    return new Date().getTime();
  };

});