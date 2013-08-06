angular.module('indelibleApp.services').service('Flash', function() {

  this.types = ['errors', 'successes', 'alerts']

  this.parse = function(input) {
    this.data = input;
  };

  this.clear = function() {
    if(!this.hold)
      this.parse({});
    else
      this.hold = false;
  };

  this.hold_flash = function() {
    this.hold = true;
  };

  this.errors = function() { return (typeof this.data.errors != 'undefined'); };
  this.no_errors = function() { return !this.errors(); };

  this.successes = function() { return (typeof this.data.successes != 'undefined'); };
  this.no_successes = function() { return !this.successes(); };

  this.alerts = function() { return (typeof this.data.alerts != 'undefined'); };
  this.no_alerts = function() { return !this.alerts(); };

  this.clear();
  this.hold = false;

});