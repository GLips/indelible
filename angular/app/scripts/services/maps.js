'use strict';

var myModule = angular.module('indelibleApp.services');

myModule.service('Maps', function() {
  this.whiteMap = { 13: '<br>', 9: '&nbsp;&nbsp;&nbsp;&nbsp;', 32: ' ', nbsp: '&nbsp;' }
  this.inkMap = { 60: '&lt;', 62: '&gt;' };
});