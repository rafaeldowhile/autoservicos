define(['app/components/controllers',
        'text!app/components/auth/login.html'], function (controllers, templateLogin) {
	
	controllers.config(['$stateProvider', function($stateProvider){
		$stateProvider
		.state('root.login', {
			url: '/login',
			views: {
				'sidebar@':{},
				'content@' : {template: templateLogin, controller: 'LoginController'},
			}
		});
	}]); 
	
	controllers.controller('LoginController', function ($rootScope, $scope, $state, AuthService) {
		$rootScope.$state = $state;
		$scope.login = function () {
			AuthService.login($scope.usuario); 
		};
		
	});
	
});