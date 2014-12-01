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
    		  if ($stateParams.id != null) {
    			  return Restangular.one('usuario').one('estabelecimentos', $stateParams.id).get();
    		  } else {
    			  return Restangular.one('usuario').one('estabelecimentos');
    		  }
    	  }]
      }
    });
  }]);

  controllers.controller('EstabelecimentoCtrl', ['$scope', 'Restangular', 'estabelecimentos', function ($scope, Restangular, estabelecimentos) {
	  $scope.estabelecimentos = estabelecimentos;
  }]);
  
  controllers.controller('EstabelecimentoDetalheCtrl', ['$scope', 'Restangular', 'estabelecimento', function ($scope, Restangular, estabelecimento) {
	  $scope.estabelecimento = estabelecimento;
	  
	  $scope.cadastrar = function () {
		  Restangular.one('estabelecimento').post($scope.estabelecimento).then(function(estabelecimento){
			  $state.go('root.estabelecimento');  
		  });
	  }
  }]);

  

});
