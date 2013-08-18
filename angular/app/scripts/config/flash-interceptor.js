var myModule = angular.module('indelibleApp');

myModule.factory('FlashInterceptor', function($q, Flash) {
  return function(promise) {
    var parseFlashes = function(response) {
      if (Flash.has_messages(response.data.flashes))
      {
        Flash.parse(response.data.flashes);
      }
      return response;
    };
    return promise.then(parseFlashes, parseFlashes);
  };
});

myModule.config(function($httpProvider) {
  $httpProvider.responseInterceptors.push('FlashInterceptor');
});