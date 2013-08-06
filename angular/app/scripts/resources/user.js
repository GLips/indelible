//
angular.module('indelibleApp.resources').factory('UserSession', ['$http', 'Flash', function($http, Flash) {

  var UserSession = function(options) {
    angular.extend(this, options);
  };

  UserSession.prototype.$save = function() {
    return $http.post(apiPrefix + '/users/sign_in.json', {
      "user" : {
        "email" : this.email,
        "password" : this.password,
        "remember_me" : this.remember_me ? 1 : 0
      }
    });
  };

  UserSession.prototype.$destroy = function() {
    return $http.delete(apiPrefix + '/users/sign_out.json')
      .success(function(data) {
        Flash.parse(data.flashes);
      });
  };

  return UserSession;

}]);

//
angular.module('indelibleApp.resources').factory('UserRegistration', ['$http', function($http) {

  var UserRegistration = function(options) {
    angular.extend(this, options);
  };

  UserRegistration.prototype.$save = function() {
    return $http.post(apiPrefix + '/users.json', {
      "user" : {
        "email" : this.email,
        "password" : this.password,
        "password_confirmation" : this.password_confirmation
      }
    })
      .error(function(data) { UserRegistration.errors = data.errors })
      .success(function(data) {  });
  };

  return UserRegistration;

}]);