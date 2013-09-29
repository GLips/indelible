'use strict';

var myModule = angular.module('indelibleApp.services');

myModule.factory ('Parser', function(Page, $sce) {
  var parser = {
    NEW: 'new',
    EDIT: 'edit',

    page: new Page({content: 'yes'}),
    marks: null,
    mode: 'history',
    output: "",
    init: function(config) {
      this.page = (config.page) ? config.page : this.page;
      this.marks = (config.marks) ? config.marks : this.marks;
      this.mode = (config.mode) ? config.mode : this.mode;
      this.render_output();
    },

    render_output: function() {
      this.output = $sce.trustAsHtml(this.page.content);
    }
  };

  return parser;
});

myModule.$inject = ['Page', '$sce'];