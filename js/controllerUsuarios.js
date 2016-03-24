app.controller('usuarios',function($scope,serverREST){

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

});