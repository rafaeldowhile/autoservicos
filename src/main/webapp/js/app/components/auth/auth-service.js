define(['app/components/services'], function (services) {
	'use strict'
	
	services.service('AuthService', function ($rootScope, $http, $state, Restangular, localStorageService, appConfiguration) {
		var service = {};

		service.login = function (user) {
			Restangular.all('authenticate').post(user).then(function(user) {
				$rootScope.user = user;
				$rootScope.user.isAuthenticated = true;
				$http.defaults.headers.common[appConfiguration.xAuthTokenHeaderName] = user.token;
				localStorageService.set('user', user);
				if ($rootScope.desiredToState !== undefined) {
					$state.go($rootScope.desiredToState);
					$rootScope.desiredToState = undefined;
				}
				else {
					$state.go('root.home');
				}
			});
		};
		
		service.logout = function () {
			delete $rootScope.user;
			delete $http.defaults.headers.common[appConfiguration.xAuthTokenHeaderName];
			localStorageService.remove('user');
			$state.go('root.login');
		};
		
		service.signin = function (user) {
			Restangular.all('signin').post(user).then(function(user) {
				service.login(user);
			});
		}
		
		return service;
	});
	
});