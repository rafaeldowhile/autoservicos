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
    	  servicos: ['Restangular', function (Restangular) {
    		 return Restangular.one('public').getList('servico');
    	  }]
      }
    });
  }]);

  controllers.controller('PrincipalCtrl', ['$scope', 'Restangular', 'estabelecimentos', 'servicos', function ($scope, Restangular, estabelecimentos, servicos) {
	  $scope.estabelecimentos = estabelecimentos;
	  $scope.filtro = {};
	  $scope.servicos = servicos;
	  $scope.pesquisar = function () {
		  var lista = [];
	      angular.forEach($scope.filtro.servicos, function (obj) {
			  this.push(obj.id);
		  }, lista);
		  Restangular.one('public').getList('estabelecimento', {servicos: lista.toString()}).then(function (estabelecimentos) {
			  $scope.estabelecimentos = estabelecimentos;
		  });
	  };
	  
  }]);

});
