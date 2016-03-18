angular.module('aplicacao',['ngRoute','naif.base64'])
.service( 'serverREST', function($http){
	return {
		"token": JSON.stringify({"token":"b73ba53c34ca234"}),
		"enviar":function(rota){
			return {
			    method: 'POST',
			    headers: {'Content-Type': undefined },
			    url : rota,
			    data : null
			};
		},
		"listaHttp": function(rota){	
		 	return $http(this.enviar(rota)).then(function successCallback(response) {	
		 		return response.data;
		    }, function errorCallback(response) {
		    	return response;	
		  	});
 		},
 		"salvaHttp": function(rota,obj){	
 			var req = this.enviar(rota);
	 		req.data = JSON.stringify(obj);
		 	$http(req).then(function successCallback(response) {
		 		console.log(response);
		    }, function errorCallback(response) {
		    	console.log(response);	
		  	});
 		},
 		"apagaHttp":function(rota,idApagar){
		 	$http(this.enviar(rota+idApagar)).then(function successCallback(response) {
		 		console.log(response);
		    }, function errorCallback(response) {
		    	console.log(response);	
		  	});
 		}

	}
})
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
.controller('produtos',function($scope,serverREST){

	$scope.reset = {"listar":false,"editar":false,"inserir":false};
	$scope.estado = angular.copy($scope.reset);
	$scope.urlPadrao = "https://phprest-nellrcs.c9users.io/app_loja/";

	//OFF
	$scope.produtos = [];


	$scope.inicial = function(){
		serverREST.listaHttp($scope.urlPadrao+'produto/')
		 .then(function successCallback(data){
		  		$scope.produtos = data;
		 });
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
		serverREST.salvaHttp($scope.urlPadrao+'produto/manter',$scope.temp);
		$scope.inicial();
		$scope.produto = null;
	}

	$scope.apagar = function(obj){
		serverREST.apagaHttp($scope.urlPadrao+'produto/apagar/',obj.ID);
		$scope.inicial();	
	}

})
.controller('usuarios',function($scope,serverREST){

	$scope.reset = {"listar":false,"editar":false,"inserir":false};
	$scope.estado = angular.copy($scope.reset);
	$scope.urlPadrao = "https://phprest-nellrcs.c9users.io/app_loja/";


	//OFF
	$scope.usuarios = [];


	$scope.inicial = function(){
		serverREST.listaHttp($scope.urlPadrao+'cliente/')
		 .then(function successCallback(data){
		  		$scope.usuarios = data;
		 });
		$scope.estado = angular.copy($scope.reset);
		$scope.estado.listar = true;		
	}
	
	$scope.inserir = function(){
		$scope.estado = angular.copy($scope.reset);
		$scope.estado.inserir = true;
		$scope.usuario = null;
	}

	$scope.editar = function(obj){
		$scope.estado = angular.copy($scope.reset);
		$scope.estado.editar = true;
		$scope.usuario = angular.copy(obj);
	}

	$scope.salvar = function(obj){
		$scope.estado = angular.copy($scope.reset);
		$scope.temp = angular.copy(obj);
		serverREST.salvaHttp($scope.urlPadrao+'cliente/manter',$scope.temp);
		$scope.inicial();
		$scope.usuario = null;
	}

	$scope.apagar = function(obj){
		serverREST.apagaHttp($scope.urlPadrao+'cliente/apagar/',obj.ID);
		$scope.inicial();	
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
