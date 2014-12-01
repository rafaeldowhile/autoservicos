define(['app/components/controllers',
        'text!app/components/auth/signin.html'], function (controllers, templateSignin) {
	
	controllers.config(['$stateProvider', function($stateProvider){
		$stateProvider
		.state('root.signin', {
			url: '/registrar',
			views: {
				'sidebar@':{},
				'content@' : {template: templateSignin, controller: 'SigninController'},
			}
		});
	}]); 
	
	controllers.controller('SigninController', function ($rootScope, $scope, $state, AuthService) {
		$rootScope.$state = $state;
		
		$scope.registrar = function () {
			AuthService.signin($scope.usuario); 
		}
		
	});
	
});