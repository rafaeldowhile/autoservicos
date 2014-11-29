define(['app/components/controllers',
        'text!app/components/home/home.html'], function (controllers, templateHome) {
	'use strict';

	controllers.config(['$stateProvider', function($stateProvider) {
		$stateProvider
	    .state('root.home', {
	        url: '/home',
	        views: {
	        	'content@': {template: templateHome, controller: 'IndexCtrl'},
	        },
	        data: {
	        	authenticate: true
	        },
	      });
	}]);

	controllers.controller('IndexCtrl', ['$scope', 'Restangular', function ($scope, Restangular) {

		 $scope.eventos = Restangular.all('evento').getList();

	}]);


});
