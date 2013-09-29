'use strict';

var myModule = angular.module('indelibleApp.resources');
myModule.factory('UserSubscription', function($http, $resource) {

  var UserSubscription = $resource(apiPrefix + '/subscriptions.json');

  UserSubscription.prototype.$save = function() {
    return $http.post(apiPrefix + '/subscriptions.json', {
      'stripeToken' : this.stripeToken
    })
  }

//  UserSubscription.$destroy = function() {
//    return $http.delete(apiPrefix + '/subscriptions.json', { id: id });
//  }

  return UserSubscription;

});

myModule.$inject = ['$http', '$resource'];