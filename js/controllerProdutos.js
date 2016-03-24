app.controller('produtos',function($scope,serverREST){

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

});