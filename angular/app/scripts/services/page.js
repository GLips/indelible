'use strict';

var myModule = angular.module('indelibleApp.services');

myModule.factory ('Page', function($resource, $http, Maps, Session, Paragraphs, Flash) {
  var page = $resource(apiPrefix + '/pages/:id', {id: '@id'}, {
    update: {
      method: 'PUT',
      transformRequest: [function(data) {
        return {
          page: {
            id: data.id,
            paragraphs_attributes: data.paragraphs.data,
            is_public: data.is_public
          }
        };
      }].concat($http.defaults.transformRequest),
      transformResponse: [function(data) {
        data = angular.fromJson(data);
        var paragraphs = new Paragraphs();
        paragraphs.init();

        // Update failed
        if(Flash.errors(data)) {
          data.page.paragraphs.forEach(function(p) {
            paragraphs.add_paragraph(p);
          });
          data.page.paragraphs = paragraphs;
        }
        return data;
      }].concat($http.defaults.transformResponse)
    },
    save: {
      method: 'POST',
      transformRequest: [function(data) {
        return {
          page: {
            paragraphs_attributes: data.paragraphs.data,
            is_public: data.is_public
          }
        };
      }].concat($http.defaults.transformRequest),
      transformResponse: [function(data) {
        data = angular.fromJson(data);
        var paragraphs = new Paragraphs();
        paragraphs.init();

        // Update failed
        if(Flash.errors(data)) {
          data.page.paragraphs.forEach(function(p) {
            paragraphs.add_paragraph(p);
          });
          data.page.paragraphs = paragraphs;
        }
        return data;
      }].concat($http.defaults.transformResponse)
    },
    get: {
      method: 'GET',
      transformResponse: [function(data) {
        data = angular.fromJson(data);
        var paragraphs = new Paragraphs();
        paragraphs.init();

        // Not the index page
        if(Flash.no_errors(data) && angular.isUndefined(data.pages)) {
          data.page.paragraphs.forEach(function(p) {
            paragraphs.add_paragraph(p);
          });
          data.page.paragraphs = paragraphs;
        }
        return data;
      }].concat($http.defaults.transformResponse)
    }
  });

  page.prototype.paragraphs = new Paragraphs();

  page.prototype.init = function() {
    if(this.paragraphs.data.length === 0) {
      this.paragraphs.new_paragraph();
    }
    this.paragraphs.calculate_word_count();
  };

  page.prototype.clear = function() {
    this.paragraphs = new Paragraphs();
    this.paragraphs.init();
  };

  page.prototype.is_owned_by_current_user = function() {
    return Session.loggedIn && Session.currentUser.id == this.user_id;
  };

  page.prototype.add_character = function(c) {
    if(this.new || this.is_owned_by_current_user()) {
      this.paragraphs.add_character(c);
    }
  };

  page.prototype.try_backspace = function() {
    this.paragraphs.try_backspace();
  };

  page.prototype.toggle_status = function() {
    this.is_public = !this.is_public;
  };

  page.prototype.status = function() {
    return (this.is_public) ? 'public' : 'private';
  };

  page.prototype.get_word_count = function() {
    return this.paragraphs.word_count;
  };

  page.prototype.calculate_word_count = function() {
    return this.paragraphs.calculate_word_count();
  };

  page.prototype.new_paragraph = function() {
    this.paragraphs.new_paragraph();
  };

  return page;
});



myModule.$inject = ['$resource', '$http', 'Maps', 'Session', 'Paragraphs', 'Flash'];