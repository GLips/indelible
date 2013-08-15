angular.module('indelibleApp.services').service('Flash', function() {

  this.types = ['errors', 'successes', 'alerts']

  this.parse = function(input) {
    this.data = input;
  };

  this.clear = function() {
    if(this.should_hold)
      this.should_hold = false;
    else
      this.parse({});
  };

  this.hold = function() {
    this.should_hold = true;
  };

  this.has_messages = function(flashObject) {
    return (typeof flashObject != 'undefined' && (typeof flashObject.errors != 'undefined' || typeof flashObject.successes != 'undefined' || typeof flashObject.alerts != 'undefined'))
  }

  this.errors = function() { return (typeof this.data.errors != 'undefined'); };
  this.no_errors = function() { return !this.errors(); };

  this.successes = function() { return (typeof this.data.successes != 'undefined'); };
  this.no_successes = function() { return !this.successes(); };

  this.alerts = function() { return (typeof this.data.alerts != 'undefined'); };
  this.no_alerts = function() { return !this.alerts(); };

  this.clear();
  this.should_hold = false;

});