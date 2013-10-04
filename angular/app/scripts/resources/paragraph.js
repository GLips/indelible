'use strict';

var myModule = angular.module('indelibleApp.resources');

myModule.factory ('Paragraph', function($resource, Maps) {
  var paragraph = $resource(apiPrefix + '/paragraph/:id', {id: '@id'}, { update: { method: 'PUT' } });

  paragraph.prototype.content = "";

  paragraph.prototype.add_character = function(c) {
    this.content += c;
  }

  paragraph.prototype.add_range = function(range) {
    var included = [],
      that = this;
    if(angular.isDefined(this.marks)) {
      this.marks.forEach(function(r) {
        if(r.has_point(range.start) && r.has_point(range.end)) {
          range.range = 0;
        } else if(range.has_point(r.start) && range.has_point(r.end)) {
          included.push(r);
        } else if(r.has_point(range.start)) {
          range.shift_start(r);
        } else if(r.has_point(range.end)) {
          range.shift_end(r);
        }
      });
    }

    included.forEach(function(r) {
      that.remove_range(r);
    });

    if(range.range > 0) {
      if(!angular.isDefined(this.marks)) { this.marks = []; }
      this.marks.push(range);
      this.sort_marks();
    }
  };

  paragraph.prototype.remove_range = function(r) {
    this.marks.splice(this.marks.indexOf(r), 1);
  };

  paragraph.prototype.is_blank = function() {
    return this.content == "";
  }

  paragraph.prototype.has_content = function() {
    return this.content != "";
  }

  paragraph.prototype.sort_marks = function() {
    this.marks.sort(function(a, b) {
      if(a.start < b.start)
        return -1;
      if(a.start > b.start)
        return 1;
      return 0;
    });
  };

  paragraph.prototype.delete_word = function() {
    this.content = this.content.substr(0, this.content.length - this.last_word_length);
  }

  paragraph.prototype.delete_whitespace = function() {
    var content = this.content;

    for(var k in Maps.whiteMap)
    {
      var w = Maps.whiteMap[k];
      if(content.substr(content.length - w.length) === w)
      {
        this.content = content.substr(0, content.length - w.length);
        return true;
      }
    }
    return false;
  }

  return paragraph;
});



myModule.$inject = ['$resource', 'Maps'];
