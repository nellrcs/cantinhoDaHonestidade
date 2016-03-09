angular.module('aplicacao',['ngRoute','naif.base64'])
.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/home', {
            templateUrl: 'home.html',
            controller: "home"
        })        
        .when('/produtos', {
            templateUrl: 'produtos.html',
            controller: "produtos"
        })        
        .when('/usuarios', {
            templateUrl: 'usuarios.html',
            controller: "usuarios"
        })
        .when('/compras', {
            templateUrl: 'compras.html',
            controller: "compras"
        })
        .otherwise({
            redirectTo: '/home'
        });
}])
.controller('produtos',function($scope){
	$scope.reset = {"listar":false,"editar":false,"inserir":false};
	$scope.estado = angular.copy($scope.reset);
	
	//OFF
	$scope.produtos = [];

	$scope.inicial = function(){
		$scope.estado = angular.copy($scope.reset);
		$scope.estado.listar = true;		
	}
	
	$scope.inserir = function(){
		$scope.estado = angular.copy($scope.reset);
		$scope.estado.inserir = true;
	}

	$scope.editar = function(){
		$scope.estado = angular.copy($scope.reset);
		$scope.estado.editar = true;
	}
	
	$scope.salvar = function(obj){

		$scope.estado = angular.copy($scope.reset);
		$scope.temp = angular.copy(obj);
		$scope.produtos.push($scope.temp);
		$scope.produto = null;
		$scope.estado.listar = true;
	}
});