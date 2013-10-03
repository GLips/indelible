'use strict';

var myModule = angular.module('indelibleApp.services');

myModule.service ('Parser', function() {
  this.NEW = 'new';
  this.EDIT = 'edit';
  this.HIGHLIGHT = 'highlight';
});

myModule.$inject = [];