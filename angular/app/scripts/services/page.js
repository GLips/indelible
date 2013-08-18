'use strict';

var myModule = angular.module('indelibleApp.services');

myModule.factory ('Page', function($resource, Maps) {
  var page = $resource(apiPrefix + '/pages/:id', {id: '@id'}, { update: { method: 'PUT' } });

  page.prototype.word_count = 0;
  page.prototype.last_word_length = 0;
  page.prototype.calculate_word_count = function() {
    if(typeof this.content != 'undefined')
    {
      var s = this.content;
      for(var k in Maps.whiteMap)
      {
        var w = Maps.whiteMap[k];
        w = new RegExp(w, "g");
        s = s.replace(w, ' ');
      }
      s = s.replace(/\s+/g, ' ');
      s = s.split(' ');
      page.prototype.last_word_length = s[(s.length - 1)].length;
      page.prototype.word_count = s.length;
    }

    return page.prototype.word_count;

  };

  return page;
});



myModule.$inject = ['$resource', 'Maps'];