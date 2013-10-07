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

  this.errors = function(data) {
    if(angular.isDefined(data)) {
      return angular.isDefined(data.flashes.errors);
    } else {
      return angular.isDefined(this.data.errors);
    }
  };
  this.no_errors = function(data) { return !this.errors(data); };

  this.successes = function() { return (typeof this.data.successes != 'undefined'); };
  this.no_successes = function() { return !this.successes(); };

  this.alerts = function() { return (typeof this.data.alerts != 'undefined'); };
  this.no_alerts = function() { return !this.alerts(); };

  this.clear();
  this.should_hold = false;

});