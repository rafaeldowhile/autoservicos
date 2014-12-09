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
    			  return Restangular.one('estabelecimento', $stateParams.id).get();
    		  } else {
    			  return Restangular.one('estabelecimento');
    		  }
    	  }],
    	  
    	  servicos: ['Restangular', function(Restangular) {
    		  return angular.forEach(Restangular.all('servico').getList(), function(value) {
    			  console.log(value);
    		  });
    	  }]
      }
    });

  }]);

  controllers.controller('EstabelecimentoCtrl', ['$scope', '$state', 'Restangular', 'estabelecimentos', '$modal', function ($scope, $state, Restangular, estabelecimentos, $modal) {
	  $scope.estabelecimentos = estabelecimentos;
	  
	  $scope.deletar = function(id) {
		    var modalInstance = $modal.open({
		      templateUrl: 'deletar.html',
		      controller: 'EstabelecimentoDeletarCtrl',
		      size: 'sm',
		      resolve: {
		        estabelecimento: ['Restangular', '$stateParams', function (Restangular, $stateParams) {
	    			  return Restangular.one('estabelecimento', id).get();
		    	  }]
		      }
		    });
		  };
  }]);
  
  controllers.controller('EstabelecimentoDetalheCtrl', ['$scope', 'Restangular', 'estabelecimento', 'servicos', '$state', 'ngToast', function ($scope, Restangular, estabelecimento, servicos, $state, ngToast) {
	  $scope.estabelecimento = estabelecimento;
	  $scope.servicos = servicos;
	  
	  if (!$scope.estabelecimento.servicos) {
		  $scope.estabelecimento.servicos = [];
	  }
	  
	  $scope.servico = {};
	  $scope.adicionar = function() {
		  var estabelecimento = {id: $scope.servico.selected.id, nome: $scope.servico.selected.nome};
		  $scope.estabelecimento.servicos.push(estabelecimento);
		  $scope.servico = {};
	  };
	  
	  $scope.salvar = function () {
		  if (!estabelecimento.id) {
			  estabelecimento.post().then(function(estabelecimento){
				  $state.transitionTo('root.estabelecimento', null, {reload: true});
			  });  
		  } else {
			  estabelecimento.put().then(function(){
				  $state.transitionTo('root.estabelecimento', null, {reload: true});
			  });			  
		  }
		  ngToast.create({
				 content: 'Estabelecimento criado.',
				 class: 'success'
			  });
	  };
  }]);

  controllers.controller('EstabelecimentoDeletarCtrl', ['$scope', '$state', '$modalInstance', 'estabelecimento', 'ngToast', function ($scope, $state, $modalInstance, estabelecimento, ngToast) {
	
	  $scope.confirmar = function () {
		  estabelecimento.remove().then(function() {
			  $state.forceReload();
			  ngToast.create({
				 content: 'Estabelecimento deletado com sucesso.',
				 class: 'danger'
			  });
		  });
		  
		  $state.forceReload();
		  $modalInstance.close();
	  };

	  $scope.cancelar = function () {
	    $modalInstance.dismiss('cancel');
	  };
  }]);

});
