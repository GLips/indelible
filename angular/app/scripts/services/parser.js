'use strict';

var myModule = angular.module('indelibleApp.services');

myModule.factory ('Parser', function(Page, $sce, Marks) {
  var parser = {
    NEW: 'new',
    EDIT: 'edit',

    page: new Page({content: 'yes'}),
    marks: null,
    mode: 'history',
    output: "",
    init: function(config) {
      this.page = (config.page) ? config.page : this.page;
      this.marks = (config.marks) ? config.marks : new Marks();
      this.mode = (config.mode) ? config.mode : this.mode;
      this.render_output();
    },

    render_output: function() {
      var text = '',
          last_point = 0,
          clean = this.page.content;
      this.marks.marks.forEach(function(mark) {
        text += clean.slice(last_point, mark.start);
        last_point = mark.start;
        text += '<span class="mark">';
        text += clean.slice(last_point, mark.start + mark.range);
        last_point += mark.range;
        text += '</span>';
      });
      text += clean.slice(last_point, clean.length);
      this.output = $sce.trustAsHtml(text);
    }
  };

  return parser;
});

myModule.$inject = ['Page', '$sce', 'Marks'];

String.prototype.splice = function( idx, rem, s ) {
  return (this.slice(0,idx) + s + this.slice(idx + Math.abs(rem)));
};