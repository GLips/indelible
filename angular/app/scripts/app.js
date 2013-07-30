'use strict';

angular.module('indelibleApp.resources', ['ngResource']);
angular.module('indelibleApp.services', ['ngResource']);
angular.module('indelibleApp.directives', []);
angular.module('indelibleApp.filters', []);
angular.module('indelibleApp.controllers', ['ngCookies']);

var App = angular.module('indelibleApp', ['ngResource', 'indelibleApp.services', 'indelibleApp.resources', 'indelibleApp.controllers']);
