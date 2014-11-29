define(['app/components/controllers'], function (controllers) {
	
	controllers.config(['$stateProvider', function($stateProvider){
		$stateProvider
		.state('root.logout', {
			url: '/logout',
			views: {
				'header@' : {},
				'sidebar@':{},
				'content@' : {controller: 'LogoutController'},
			}
		});
	}]); 
	
	controllers.controller('LogoutController', function ($log, $rootScope, $http, appConfiguration, $state, localStorageService, AuthService) {
		AuthService.logout();
	});
	
});