'use strict';

var myModule = angular.module('indelibleApp.resources');

myModule.factory ('Paragraphs', function(Paragraph, Collection) {
  var paragraphs = new Collection('paragraphs');

  paragraphs.prototype.data = [
    new Paragraph({ content: 'This is the first paragraph\'s content', order: 1, name: 'e17c' }),
    new Paragraph({ content: 'Paragraph #2', order: 2, 'name': 'fa59' })
  ];

  paragraphs.prototype.add_character = function(c) {
    this.data[this.data.length - 1].add_character(c);
  }

  return paragraphs;
});

myModule.$inject = ['$resource', 'Paragraph', 'Collection'];
