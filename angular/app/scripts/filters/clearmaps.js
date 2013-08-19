
var myModule = angular.module('indelibleApp.filters');
myModule.filter('clearMaps', function(Maps) {
	return function(value) {
		return Maps.strip_whitemapped_characters(value);
	}
});

myModule.$inject = ['Maps'];
