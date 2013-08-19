'use strict';

var myModule = angular.module('indelibleApp.services');

myModule.service('Maps', function() {
  this.whiteMap = { 13: '<br>', 9: '&nbsp;&nbsp;&nbsp;&nbsp;', 32: ' ', nbsp: '&nbsp;' }
  this.inkMap = { 60: '&lt;', 62: '&gt;' };
	this.strip_whitemapped_characters = function(s) {
    for(var k in this.whiteMap)
    {
      var w = this.whiteMap[k];
      w = new RegExp(w, "g");
      s = s.replace(w, ' ');
    }
    s = s.replace(/\s+/g, ' ');
		return s;
	}
});
