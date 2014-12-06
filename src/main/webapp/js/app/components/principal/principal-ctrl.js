define(['app/components/controllers',
'text!app/components/principal/principal.html'], function (controllers, templatePrincipal) {
  'use strict';

  controllers.config(['$stateProvider', function($stateProvider) {
    $stateProvider
    .state('root.principal', {
      url: '/',
      views: {
        'content@': {template: templatePrincipal, controller: 'PrincipalCtrl'},
        'sidebar@' : {},
      },
      data: {
        authenticate: false
      },
      resolve: {
    	  estabelecimentos: ['Restangular', function (Restangular) {
    		 return Restangular.one('public').getList('estabelecimento'); 
    	  }],
      }
    });
  }]);

  controllers.controller('PrincipalCtrl', ['$scope', 'Restangular', 'estabelecimentos', function ($scope, Restangular, estabelecimentos) {
	  $scope.estabelecimentos = estabelecimentos;
  }]);

});
