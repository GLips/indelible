'use strict';

var myModule = angular.module('indelibleApp.services');

myModule.factory ('Page', function($resource, Maps, Session, Paragraphs, Marks) {
  var page = $resource(apiPrefix + '/pages/:id', {id: '@id'}, { update: { method: 'PUT' } });

  page.prototype.paragraphs = [];
  page.prototype.marks = Marks;

  page.prototype.init = function() {
    this.paragraphs = new Paragraphs();
    this.paragraphs.calculate_word_count();
  }

  page.prototype.is_owned_by_current_user = function() {
    return Session.loggedIn && Session.currentUser.id == this.user_id;
  }

  page.prototype.add_character = function(c) {
    if(this.new || this.is_owned_by_current_user()) {
      this.paragraphs.add_character(c);
    }
  }

  page.prototype.try_backspace = function() {
    this.paragraphs.try_backspace();
  }

  page.prototype.toggle_status = function() {
    this.is_public = !this.is_public;
  }

  page.prototype.status = function() {
    return (this.is_public) ? 'public' : 'private';
  }

  page.prototype.get_word_count = function() {
    return this.paragraphs.word_count;
  }

  page.prototype.calculate_word_count = function() {
    return this.paragraphs.calculate_word_count();
  }

  page.prototype.new_paragraph = function() {
    this.paragraphs.new_paragraph();
  }

  return page;
});



myModule.$inject = ['$resource', 'Maps', 'Session', 'Paragraphs'];
