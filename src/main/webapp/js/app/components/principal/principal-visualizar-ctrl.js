define(['app/components/controllers',
'text!app/components/principal/principal-visualizar.html'], function (controllers, templatePrincipalVisualizar) {
  'use strict';

  controllers.config(['$stateProvider', function($stateProvider) {
    $stateProvider
    .state('root.principal.visualizar', {
      url: 'estabelecimento/:id',
      views: {
        'content@': {template: templatePrincipalVisualizar, controller: 'PrincipalVisualizarCtrl'},
        'sidebar@' : {},
      },
      data: {
        authenticate: false
      },
      resolve: {
    	  estabelecimento: ['Restangular', '$stateParams', function (Restangular, $stateParams) {
    		 return Restangular.one('public').one('estabelecimento', $stateParams.id).get(); 
    	  }],
      }
    });
  }]);

  controllers.controller('PrincipalVisualizarCtrl', ['$scope', 'Restangular', 'estabelecimento', function ($scope, Restangular, estabelecimento) {
	  $scope.estabelecimento = estabelecimento;
  }]);

});
