var app = angular.module('aplicacao',['ngRoute','naif.base64']);
app.service( 'serverREST', function($http){
	return {
		"token": "",
		"enviar":function(rota){
			return {
			    method: 'POST',
			    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			    url : rota,
			    data : {}
			};
		},
		"listaHttp": function(rota){
			var req = this.enviar(rota);
	 		req.data.token = this.token;	

		 	return $http(req).then(function successCallback(response) {	
		 		return response.data;
		    }, function errorCallback(response) {
		    	return response;	
		  	});
 		},
 		"salvaHttp": function(rota,obj){	
 			var req = this.enviar(rota);
	 		req.data = JSON.stringify(obj);
	 		req.data.token = this.token;

		 	$http(req).then(function successCallback(response) {
		 		console.log(response);
		    }, function errorCallback(response) {
		    	console.log(response);	
		  	});
 		},
 		"apagaHttp":function(rota,idApagar){

 			var req = this.enviar(rota+idApagar);
	 		req.data = JSON.stringify(obj);
	 		req.data.token = this.token;

		 	$http(req).then(function successCallback(response) {
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
