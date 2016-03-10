angular.module('aplicacao',['ngRoute','naif.base64'])
.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/home', {
            templateUrl: 'home.html',
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
		$scope.produto = null;
	}

	$scope.editar = function(obj){
		$scope.estado = angular.copy($scope.reset);
		$scope.estado.editar = true;
		$scope.produto = angular.copy(obj);
	}

	$scope.salvar = function(obj){

		$scope.estado = angular.copy($scope.reset);
		$scope.temp = angular.copy(obj);
		$scope.produtos.push($scope.temp);
		$scope.produto = null;
		$scope.estado.listar = true;
	}

	$scope.apagar = function(obj){
		console.log(obj);
	}

})
.controller('usuarios',function($scope){

	$scope.reset = {"listar":false,"editar":false,"inserir":false};
	$scope.estado = angular.copy($scope.reset);

	//OFF
	$scope.usuarios = [];

	$scope.inicial = function(){
		$scope.estado = angular.copy($scope.reset);
		$scope.estado.listar = true;		
	}
	
	$scope.inserir = function(){
		$scope.usuario = null;
		$scope.estado = angular.copy($scope.reset);
		$scope.estado.inserir = true;
	}

	$scope.editar = function(obj){
		$scope.estado = angular.copy($scope.reset);
		$scope.estado.editar = true;
		$scope.usuario = angular.copy(obj);
	}
	
	$scope.salvar = function(obj){
		$scope.estado = angular.copy($scope.reset);
		$scope.temp = angular.copy(obj);
		$scope.usuarios.push($scope.temp);
		$scope.usuario = null;
		$scope.estado.listar = true;
		console.log($scope.usuarios);
	}

	$scope.apagar = function(obj){
		console.log(obj);
	}

})
.controller('compras',function($scope){	
	//OFF
	$scope.compras = [];
	$scope.compras.push({
		"imgProd":"http://lorempixel.com/80/75/",
		"nomeProd":"sabao",
		"valorProd":"100.00",
		"nomeCliente":"Nome do cliente",
		"emailCliente":"cliente@compra.com",
		"dataCliente":"22/05/2016"
	})

})