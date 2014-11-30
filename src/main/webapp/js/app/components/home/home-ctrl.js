define(['app/components/controllers',
        'text!app/components/home/home.html'], function (controllers, templateHome) {
	'use strict';

	controllers.config(['$stateProvider', function($stateProvider) {
		$stateProvider
	    .state('root.home', {
	        url: '/home',
	        views: {
	        	'content@': {template: templateHome, controller: 'HomeCtrl'},
	        },
	        data: {
	        	authenticate: true
	        },
	      });
	}]);

	controllers.controller('HomeCtrl', ['$scope', 'Restangular', function ($scope, Restangular) {

	}]);


});
