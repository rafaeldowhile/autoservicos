requirejs.config({
  baseUrl: 'js',
  paths:{
	  'angular': 'lib/angular',
	  'angular-local-storage': 'lib/angular-local-storage',
	  'angular-animate': 'lib/angular-animate',
	  'angular-sanitize': 'lib/angular-sanitize',
	  'angular-loading-bar': 'lib/loading-bar',
	  'bootstrap': 'lib/bootstrap',
	  'ui-router': 'lib/angular-ui-router',
	  'ui-bootstrap': 'lib/ui-bootstrap',
	  'ui-bootstrap-tpls': 'lib/ui-bootstrap-tpls',
	  'ui-utils': 'lib/ui-utils',
	  'ui-select': 'lib/select',
	  'jquery': 'lib/jquery',
	  'lodash': 'lib/lodash',
	  'ngToast': 'lib/ngToast',
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

	'angular-animate': {
		deps: ['angular']
	},
	
	'angular-sanitize': {
		deps: ['angular']
	},

	'angular-local-storage': {
		deps: ['angular']
	},
	
	'angular-loading-bar': {
		deps: ['angular']
	},
	
	'ui-bootstrap-tpls': {
		deps: ['angular']
	},
	
	'ui-select': {
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

	'ui-router': {
		deps: ['angular']
	},

	'less': {
		deps: ['angular']
	},
	
	'ui-bootstrap': {
		deps: ['angular']
	},
	
	'ui-utils': {
		deps: ['angular']
	},
	
	'ngToast': {
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
