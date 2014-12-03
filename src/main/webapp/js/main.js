requirejs.config({
  baseUrl: 'js',
  paths:{
	  'angular': 'lib/angular',
	  'angular-route': 'lib/angular-route',
	  'angular-ui-router': 'lib/angular-ui-router',
	  'angular-local-storage': 'lib/angular-local-storage',
	  'angular-animate': 'lib/angular-animate',
	  'angular-loading-bar': 'lib/loading-bar',
	  'bootstrap': 'lib/bootstrap',
	  'angular-ui': 'lib/angular-ui',
	  'ui-bootstrap': 'lib/ui-bootstrap',
	  'jquery': 'lib/jquery',
	  'lodash': 'lib/lodash',
	  'restangular': 'lib/restangular',
	  'text': 'lib/text',
	  'less': 'lib/less',
	  'app': 'app',
	  'partials': '../partials',
  },
  shim:{
	'angular': {
		deps: ['jquery'],
		exports: 'angular'
	},

	'angular-route': {
		deps: ['angular']
	},
	
	'angular-ui': {
		deps: ['angular']
	},
	
	'angular-animate': {
		deps: ['angular']
	},

	'angular-local-storage': {
		deps: ['angular']
	},
	
	'angular-loading-bar': {
		deps: ['angular']
	},

	'lodash': {
		deps: ['angular']
	},

	'jquery': {
		exports: '$'
	},

	'restangular': {
		deps: ['angular', 'lodash']
	},

	'text': {
		deps: ['jquery']
	},

	'angular-ui-router': {
		deps: ['angular']
	},

	'less': {
		deps: ['angular']
	},
	
	'ui-bootstrap': {
		deps: ['angular']
	}

  }
});

requirejs.onError = function (err) {
    console.log(err);
  };

/*
 * Realiza a inicialização da aplicação com o angular depois de resolver o arquivo de configuração.
 */
require(['app'], function () {
	'use strict';

	$(document).ready(function () {
		angular.bootstrap(document, ['autoservicos']);
	});
});
