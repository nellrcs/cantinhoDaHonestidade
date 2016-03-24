app.controller('compras',function($scope,serverREST){

	$scope.reset = {"ano":null,"listar":false,"editar":false,"inserir":false};
	$scope.estado = angular.copy($scope.reset);
	$scope.urlPadrao = "https://phprest-nellrcs.c9users.io/app_loja/";

	//OFF
	$scope.compras = [];
	$scope.meses = [];
	$scope.usuarios = [];
	$scope.pagamentos = [];
	$scope.carregando = false;

	var date = new Date();
	var anoAtual = date.getFullYear();
    var os12 = [ 
	    {"ano":anoAtual,"nome":"Janeiro","numero":1}, 
		{"ano":anoAtual,"nome":"Fevereiro","numero":2}, 
		{"ano":anoAtual,"nome":"Março","numero":3}, 
		{"ano":anoAtual,"nome":"Abril","numero":4}, 
		{"ano":anoAtual,"nome":"Maio","numero":5}, 
		{"ano":anoAtual,"nome":"Junho","numero":6},
		{"ano":anoAtual,"nome":"Julho","numero":7}, 
		{"ano":anoAtual,"nome":"Agosto","numero":8}, 
		{"ano":anoAtual,"nome":"Setembro","numero":9}, 
		{"ano":anoAtual,"nome":"Outubro","numero":10}, 
		{"ano":anoAtual,"nome":"Novembro","numero":11}, 
		{"ano":anoAtual,"nome":"Dezembro","numero":12} 
	];

	for(var i = 0; i <= date.getMonth(); i++) {
		$scope.meses.push(os12[i]);
    }

	$scope.inicial = function(){
		$scope.carregando = true;
		serverREST.listaHttp($scope.urlPadrao+'cliente/')
		 .then(function successCallback(data){
		  		$scope.usuarios = data;
		  		$scope.carregando = false;
		});
	}

	$scope.listar = function(obj){
		$scope.carregando = true;
		cliente = obj.idClient ? obj.idClient : 0;
		serverREST.listaHttp($scope.urlPadrao+'compra/seleciona/'+obj.anoMes+"/"+cliente)
		 .then(function successCallback(data){
		  		$scope.compras = data;
		  		//console.log(data);
		  		$scope.carregando = false;
		 });
	}

	$scope.addPagamentos = function(pagmento){
		$scope.temp = [{'ID':pagmento.ID,'status':pagmento.status ? 1 : 0}];
		serverREST.salvaHttp($scope.urlPadrao+'compra/altera',$scope.temp);


	/*	
		var pont = false;
		angular.forEach($scope.pagamentos, function(value, key){
			if(value.ID == pagmento.ID){
				$scope.pagamentos[key] = {'ID':pagmento.ID,'status':pagmento.status ? 1 : 0};
				pont = true;
			}
		});
		if(!pont){
			$scope.pagamentos.push({'ID':pagmento.ID,'status':pagmento.status ? 1 : 0});	
		}
	*/
	}

	$scope.calculaTotais = function(){
	    var total = 0.0;
	    var pago = 0.0;
	    for(var i = 0; i < $scope.compras.length; i++){
	        var comp = $scope.compras[i];

	        if(comp.status == '1'){
	        	pago = pago + parseFloat(comp.valor_compra);
	        }
	        total = total + parseFloat(comp.valor_compra);
	    }

	    return {"total":total,"pago":pago};
	}



});