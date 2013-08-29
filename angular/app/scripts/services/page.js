'use strict';

var myModule = angular.module('indelibleApp.services');

myModule.factory ('Page', function($resource, Maps, Session) {
  var page = $resource(apiPrefix + '/pages/:id', {id: '@id'}, { update: { method: 'PUT' } });

  page.prototype.word_count = 0;
  page.prototype.max_word_count = 0;
  page.prototype.last_word_length = 0;
  page.prototype.is_owned_by_current_user = function() {
    return Session.loggedIn && Session.currentUser.id == this.user_id;
  }

  page.prototype.add_character = function(c) {
		this.content += c;
  }

  page.prototype.try_backspace = function() {
    if(!this.delete_whitespace()) {
      this.delete_word();
    }
  }

  page.prototype.delete_word = function() {
    var content = this.content;

    if(this.calculate_word_count() == this.max_word_count)
    {
      this.content = content.substr(0, content.length - this.last_word_length);
    }
  }

  page.prototype.delete_whitespace = function() {
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

  page.prototype.calculate_word_count = function() {
    if(typeof this.content != 'undefined')
    {
			var s = Maps.strip_whitemapped_characters(this.content);
      s = s.match(/\S+/g);
			if (s != null) {
				this.last_word_length = s[(s.length - 1)].length;
				this.word_count = s.length;
				this.max_word_count = (this.max_word_count > this.word_count) ? this.max_word_count : this.word_count;
			} else {
				this.last_word_length = 0;
				this.word_count = 0;
				this.max_word_count = 0;
			}
    }
    return this.word_count;
  };

	page.prototype.get_word_count = function() {
    return this.word_count;
	}

  return page;
});



myModule.$inject = ['$resource', 'Maps', 'Session'];
