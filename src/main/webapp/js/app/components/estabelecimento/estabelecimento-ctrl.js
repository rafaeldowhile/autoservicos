define(['app/components/controllers',
'text!app/components/estabelecimento/estabelecimento.html',
'text!app/components/estabelecimento/estabelecimento-detalhe.html'], function (controllers, templateEstabelecimento, templateEstabelecimentoDetalhe) {
  'use strict';

  controllers.config(['$stateProvider', function($stateProvider) {
    $stateProvider
    .state('root.estabelecimento', {
      url: '/estabelecimentos',
      views: {
        'content@': {template: templateEstabelecimento, controller: 'EstabelecimentoCtrl'},
      },
      data: {
        authenticate: true
      },
      resolve: {
    	  estabelecimentos: ['Restangular', function (Restangular) {
    		  // usuario/{id}/estabelecimentos
    		  return Restangular.one('usuario').getList('estabelecimentos');
    	  }]
      }
    });
    
    $stateProvider
    .state('root.estabelecimento.detalhe', {
      url: '/detalhe/:id',
      views: {
        'content@': {template: templateEstabelecimentoDetalhe, controller: 'EstabelecimentoDetalheCtrl'},
      },
      data: {
        authenticate: true
      },
      resolve: {
    	  estabelecimento: ['Restangular', '$stateParams', function (Restangular, $stateParams) {
    		  // usuario/{id}/estabelecimentos
    		  if ($stateParams.id != '') {
    			  return Restangular.one('usuario').one('estabelecimentos', $stateParams.id).get();
    		  } else {
    			  return Restangular.one('estabelecimento');
    		  }
    	  }],
    	  
    	  servicos: ['Restangular', function(Restangular) {
    		  return Restangular.all('servico').getList();
    	  }]
      }
    });
  }]);

  controllers.controller('EstabelecimentoCtrl', ['$scope', 'Restangular', 'estabelecimentos', function ($scope, Restangular, estabelecimentos) {
	  $scope.estabelecimentos = estabelecimentos;
  }]);
  
  controllers.controller('EstabelecimentoDetalheCtrl', ['$scope', 'Restangular', 'estabelecimento', 'servicos', '$state', function ($scope, Restangular, estabelecimento, servicos, $state) {
	  $scope.estabelecimento = estabelecimento;
	  $scope.servicos = servicos;
	  $scope.servico = {};
	  ;
	  $scope.cadastrar = function () {
		  estabelecimento.post().then(function(estabelecimento){
			  $state.transitionTo('root.estabelecimento', null, {reload: true});
		  });
	  }
  }]);

  

});
