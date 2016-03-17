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
.controller('produtos',function($scope,$http){

	$scope.reset = {"listar":false,"editar":false,"inserir":false};
	$scope.estado = angular.copy($scope.reset);
	$scope.urlPadrao = "https://phprest-nellrcs.c9users.io/app_loja/";


	//OFF
	$scope.produtos = [];

	/* serviço */
	
	var req = {
	    method: 'POST',
	    headers: {'Content-Type': undefined }
	};

 	$scope.listaHttp = function() 
 	{	
 		req.url = $scope.urlPadrao+"produto/";
 		req.data = JSON.stringify({"token":"b73ba53c34ca234"});

	 	$http(req).then(function successCallback(response) {
	 		$scope.produtos = response.data;
	    }, function errorCallback(response) {
	    	console.log(response);	
	  	});
 	}

 	$scope.salvaHttp = function(obj) 
 	{
 		req.url = $scope.urlPadrao+"/produto/manter";
 		req.data = JSON.stringify(obj);
	 	$http(req).then(function successCallback(response) {
	 		//$scope.produtos = response.data;
	 		console.log(response);
	 		$scope.listaHttp();
	    }, function errorCallback(response) {
	    	console.log(response);	
	  	});
 	}

 	$scope.apagaHttp = function(idApagar) 
 	{
 		req.url = $scope.urlPadrao+"/produto/apagar/"+idApagar;
	 	$http(req).then(function successCallback(response) {
	 		//$scope.produtos = response.data;
	 		$scope.listaHttp();
	    }, function errorCallback(response) {
	    	console.log(response);	
	  	});
 	}

	/*  - - - - - - */
	$scope.inicial = function(){
		$scope.listaHttp();	
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
		//$scope.temp.foto_produto = $scope.temp.foto_produto.base64;
		//$scope.produtos.push($scope.temp);
		$scope.salvaHttp($scope.temp);
		$scope.produto = null;
		$scope.estado.listar = true;
	}

	$scope.apagar = function(obj){
		console.log(obj);
		$scope.apagaHttp(obj.ID)
				
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
