var app = angular.module('aplicacao',['ngRoute','naif.base64']);
app.service( 'serverREST', function($http){
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
});
app.config(['$routeProvider', function($routeProvider) {
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
