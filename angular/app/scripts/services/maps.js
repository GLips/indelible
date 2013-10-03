'use strict';

var myModule = angular.module('indelibleApp.services');

myModule.service('Maps', function() {
  this.whiteMap = { 13: '<p></p>', pbegin: '<p>', pend: '</p>', 9: '&nbsp;&nbsp;&nbsp;&nbsp;', 32: ' ', nbsp: '&nbsp;' }
  this.inkMap = { 60: '&lt;', 62: '&gt;' };

	this.strip_whitemapped_characters = function(s) {
		var w = '';
    for(var k in this.whiteMap) {
      w += this.whiteMap[k] + "|";
    }
		w = '(' + w.substr(0, w.length - 1) + ')+';
		w = new RegExp(w, "g");
		return s.replace(w, ' ');
	}

  this.getKey = function(key) {
    var c;
    c = this.whiteMap[key];
    c = c || this.inkMap[key];
    c = c || String.fromCharCode(key);
    return c;
  }
});
