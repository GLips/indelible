'use strict';

var myModule = angular.module('indelibleApp.resources');

myModule.factory ('Paragraphs', function(Paragraph, Collection, Maps) {
  var paragraphs = new Collection('paragraphs');

  paragraphs.prototype.word_count = 0;
  paragraphs.prototype.max_word_count = 0;
  paragraphs.prototype.last_word_length = 0;

  paragraphs.prototype.data = [
    new Paragraph({ content: 'This is the first paragraph\'s content', order: 1, name: 'e17c' }),
    new Paragraph({ content: 'Paragraph #2', order: 2, 'name': 'fa59' }),
    new Paragraph({ content: 'oneword', order: 3, 'name': 'abc0' })
  ];

  paragraphs.prototype.add_character = function(c) {
    this.data[this.data.length - 1].add_character(c);
  }

  paragraphs.prototype.try_backspace = function() {
    if(this.last_paragraph().is_blank()) {
      this.data.pop();
    }
    else if(!this.last_paragraph().delete_whitespace()) {
      if(this.calculate_word_count() == this.max_word_count)
      {
        this.last_paragraph().delete_word();
      }
    }
  };

  paragraphs.prototype.last_paragraph = function() {
    return this.data[this.data.length - 1];
  }

  paragraphs.prototype.calculate_word_count = function() {
    var last_word_length = this.last_word_length,
      word_count = 0,
      max_word_count = this.max_word_count,
      last_paragraph = this.last_paragraph();

    this.data.forEach(function(p) {
        if(angular.isDefined(p.content))
        {
          var s = Maps.strip_whitemapped_characters(p.content);
          s = s.match(/\S+/g);
          if (s != null) {
            last_word_length = s[(s.length - 1)].length;
            word_count += s.length;
            max_word_count = (max_word_count > word_count) ? max_word_count : word_count;
          }
        }
    });

    last_paragraph.last_word_length = last_word_length;
    this.last_word_length = last_word_length;
    this.word_count = word_count;
    this.max_word_count = max_word_count;
    return this.word_count;
  }

  return paragraphs;
});

myModule.$inject = ['$resource', 'Paragraph', 'Collection', 'Maps'];
