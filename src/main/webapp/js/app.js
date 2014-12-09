define([ 'angular',
         'text!app/shared/layout/layout.html',
         'text!app/shared/header/header.html',
         'text!app/shared/sidebar/sidebar.html',
         'text!app/shared/footer/footer.html',
         'angular-local-storage',
         'angular-animate',
         'angular-sanitize',
         'angular-loading-bar',
         'restangular',
         'text',
         'ngToast',
         'ui-bootstrap',
         'ui-bootstrap-tpls',
         'ui-router',
         'ui-utils',
         'ui-select',
         'PhoneNumber',

         'app/shared/filters',
         'app/shared/filters/phone',
		 'app/components/controllers',
		 'app/components/services',
		 'app/components/auth/auth-service',
		 'app/components/auth/login-ctrl',
		 'app/components/auth/signin-ctrl',
		 'app/components/auth/logout-ctrl',
		 'app/components/home/home-ctrl',
		 'app/components/estabelecimento/estabelecimento-ctrl',
		 'app/components/principal/principal-ctrl',
		 'app/components/principal/principal-visualizar-ctrl',

], function(angular, templateLayout, templateHeader, templateSidebar, templateFooter) {
	'use strict';
	var app = angular.module('autoservicos',['ui.router', 'ui.bootstrap', 'ui.bootstrap.tabs', 'ui.mask', 'ui.select', 
                                         	'restangular', 'LocalStorageModule', 'chieffancypants.loadingBar', 
                                         	'ngAnimate', 'ngSanitize', 'ngToast', 'autoservicos.controllers', 
                                         	'autoservicos.services', 'autoservicos.filters']);

	app.constant('appConfiguration', {
		xAuthTokenHeaderName: 'X-Auth-Token'
	});

	app.config(['$urlRouterProvider', '$httpProvider', '$stateProvider', 'localStorageServiceProvider', '$provide', function($urlRouterProvider, $httpProvider, $stateProvider, localStorageServiceProvider, $provide, appConfiguration) {
		$provide.decorator('$state', function($delegate, $stateParams) {
	        $delegate.forceReload = function() {
	            return $delegate.go($delegate.current, $stateParams, {
	                reload: true,
	                inherit: false,
	                notify: true
	            });
	        };
	        return $delegate;
	    });
		localStorageServiceProvider.setPrefix('inv');
		$urlRouterProvider.otherwise('/');
		$stateProvider.state('root', {
			abstract: true,
			url: '',
			views: {
				'header': {template: templateHeader},
				'sidebar': {template: templateSidebar},
				'footer': {template: templateFooter}
			}
		});

		/* Intercept http errors */
		$httpProvider.interceptors.push(function ($rootScope, $q, $location, appConfiguration, ngToast) {
			return {
			'request' : function(config) {
					if ($rootScope.user) {
						config.headers[appConfiguration.xAuthTokenHeaderName] = $rootScope.user.token;
					}
					
					return config || $q.when(config);
				},
				
			'responseError' : function (response) {
				console.log(response);
				ngToast.create({
					content: response.data.mensagemErro,
					class: 'danger',
					});

				return $q.reject(response);

			}
			}
		});
		

	}]);

	app.run(function($rootScope, $state, $log, Restangular, localStorageService) {
		Restangular.setBaseUrl('api/v1');

		if (localStorageService.get('user')) {
			$rootScope.user = localStorageService.get('user');
		}

		$rootScope.$on('$stateChangeStart', function(event, toState) {
			if (toState.data !== undefined && toState.data.authenticate !== undefined) {
//				$log.info('Need to authenticate', toState);
//				$log.info('User authenticated?', $rootScope.isAuthenticated());
				//appConfiguration.authenticationEnabled &&
				if (toState.data.authenticate && !$rootScope.isAuthenticated()){
					// User is not authenticated
//					$log.info('Setting desired state to ' + toState.name);
					$rootScope.desiredToState = toState.name;
					$state.transitionTo('root.login');
					event.preventDefault();
				}
			}
		});

		$rootScope.isAuthenticated = function() {

			if ($rootScope.user === undefined) {
				return false;
			}
			if ($rootScope.user.isAuthenticated === undefined) {
				return false;
			}
			if (!$rootScope.user.isAuthenticated) {
				return false;
			}
			return true;
		};

		$rootScope.hasRole = function(role) {

			if (!$rootScope.isAuthenticated()) {
				return false;
			}
			if ($rootScope.user.roles[role] === undefined) {
				return false;
			}
			return $rootScope.user.roles[role];
		};

	});

	return app;
});
