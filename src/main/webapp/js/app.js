define([ 'angular',
         'text!app/shared/layout/layout.html',
         'text!app/shared/header/header.html',
         'text!app/shared/sidebar/sidebar.html',
         'angular-local-storage',
         'angular-ui-router',
         'restangular',
         'satellizer',
         'text',

         'app/shared/filters',
		 'app/components/controllers',
		 'app/components/services',
		 'app/components/auth/auth-service',
		 'app/components/auth/login-ctrl',
		 'app/components/auth/logout-ctrl',
		 'app/components/home/home-ctrl'

], function(angular, templateLayout, templateHeader, templateSidebar) {
	'use strict';
	var app = angular.module('autoservicos',['ui.router', 'restangular', 'LocalStorageModule', 'autoservicos.controllers', 'autoservicos.services']);

	app.constant('appConfiguration', {
		xAuthTokenHeaderName: 'x-auth-token'
	});

	app.config(['$urlRouterProvider', '$httpProvider', '$stateProvider', 'localStorageServiceProvider', function($urlRouterProvider, $httpProvider, $stateProvider, localStorageServiceProvider) {
		localStorageServiceProvider.setPrefix('inv');
		$urlRouterProvider.otherwise('/home');
		$stateProvider.state('root', {
			abstract: true,
			url: '',
			views: {
				'header': {template: templateHeader},
				'sidebar': {template: templateSidebar},
			}
		});

		/* Intercept http errors */
		$httpProvider.interceptors.push(function ($rootScope, $q, $location) {
			return {
			'reponse' : function(response) {
					function success(response) {
						return response;
					}

					function error(response) {
						var status = response.status;
						var config = response.config;
						var method = config.method;
						var url = config.url;

						if (status === 401) {
							$location.path('/login');
						} else {
							$rootScope.error = method + ' on ' + url + ' failed with status ' + status;
						}

						return $q.reject(response);
					}

					return function (promise) {
							return promise.then(success, error);
					}
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
				$log.info('Need to authenticate', toState);
				$log.info('User authenticated?', $rootScope.isAuthenticated());
				//appConfiguration.authenticationEnabled &&
				if (toState.data.authenticate && !$rootScope.isAuthenticated()){
					// User is not authenticated
					$log.info('Setting desired state to ' + toState.name);
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
