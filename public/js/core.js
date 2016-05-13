(function() {
    angular
        .module("Repo_Indi", [], function($locationProvider) {
            $locationProvider.html5Mode({
                enabled: true,
                requireBase: false
            })
        })
        .controller("MainController", MainController);

    MainController.$inject = ["$scope", "$http", "$location"];

    function MainController($scope, $http, $location) {        
		$scope.tsec = {};
        $scope.move = {};
        $scope.moveheavier = {};
        $scope.delay = {};
		
		$scope.tsec.respuesta = '';

        $scope.tsec.body = '{"authentication":{"consumerId":"00000000","authenticationType":"00","authenticationData":[{"authenticationData":["4fuUbLcftRaabA1/3gfZ61IjR6MuLSj4GafZTK5PHPBoWtp93IJVU8zQ5doT0p/b"],"idAuthenticationData":"iv_ticketService"}],"userId":"ADMINF","accessCode":"0017800035458458"},"userPreferences":{"language":"es"}}';        
		$scope.move.body = 'abcde';        
		$scope.moveheavier.body = 'MSG01................';        
		$scope.delay.body = '000000002';   
		
		//para menus
		$scope.usuario = {};
		$scope.menu1 = {};
		$scope.menu2 = {};

		$scope.menus = {};

		$scope.selected = false;

		$scope.menus.show = {};
		$scope.menus.show = false;
		//fin menus
		
		$scope.quitaDivCarga=function() {
			// eliminamos el div que bloquea pantalla
			$("#modal").remove(); 
		}
		
		$scope.divCarga=function (mensaje) {
			//eliminamos si existe un div ya bloqueando
			$scope.quitaDivCarga();
		 					 
			//centrar imagen gif
			height = 20;//El div del titulo, para que se vea mas arriba (H)
			var ancho = 0;
			var alto = 0;
		 
			//obtenemos el ancho y alto de la ventana de nuestro navegador, compatible con todos los navegadores
			if (window.innerWidth == undefined) ancho = window.screen.width;
			else ancho = window.innerWidth;
			if (window.innerHeight == undefined) alto = window.screen.height;
			else alto = window.innerHeight;
		 
			//operación necesaria para centrar el div que muestra el mensaje
			var heightdivsito = alto/2 - parseInt(height)/2;//Se utiliza en el margen superior, para centrar
		 
		   //imagen que aparece mientras nuestro div es mostrado y da apariencia de cargando
			imgCentro = "<div style='text-align:center;height:" + alto + "px;'><div  style='color:#000;margin-top:" + heightdivsito + "px; font-size:20px;font-weight:bold'></div><img  src='img/loading.gif'></div>";
		 
				//creamos el div que bloquea grande------------------------------------------
				div = document.createElement("div");
				div.id = "modal"
				div.style.width = ancho + "px";
				div.style.height = alto + "px";
				$("body").append(div);
		 
				//creamos un input text para que el foco se plasme en este y el usuario no pueda escribir en nada de atras
				input = document.createElement("input");
				input.id = "focusInput";
				input.type = "text"
		 
				//asignamos el div que bloquea
				$("#modal").append(input);
		 
				//asignamos el foco y ocultamos el input text
				$("#focusInput").focus();
				$("#focusInput").hide();
		 
				//centramos el div del texto
				$("#modal").html(imgCentro);
		 
		}
		
		$scope.muestraPba = function(valor){				
			if(valor=="move"){
				$("#trucha-move").show();
				$("#trucha-moveheavier").hide();
				$("#trucha-delay").hide();
			}else if(valor=="heavier"){
				$("#trucha-moveheavier").show();
				$("#trucha-move").hide();
				$("#trucha-delay").hide();
			}else{
				$("#trucha-delay").show();
				$("#trucha-move").hide();
				$("#trucha-moveheavier").hide();
			}
		}
		
		
		//muestra menus
		// Login
		$scope.loginon = function() {
			$http.get('/api/login/' + $scope.newUsuario.User + '/' + $scope.newUsuario.Pass).success(function(data) {					
					$scope.usuario = data;					 
					if (data.length == 1) {
						fn_msg('S', 'Acceso Exitoso.');
						console.log("Acceso correcto a: "+$scope.newUsuario.User);
						$scope.getmenu1();
						//$scope.getmenu2();
					} else {
						fn_msg('W', 'Acceso Restringido.');
					}

					$scope.selected = false;
				})
				.error(function(data) {
					fn_msg('E', data);
				});

		};

		// Obtener menu
		$scope.getmenu1 = function() {
			$http.get('/api/menu1/' + $scope.newUsuario.User + '/1').success(function(data) {
					$scope.menu1 = data;					

					if (data.length >= 1) {
						$scope.menus.show = true;
						fn_msg('S', 'Validación de perfilado.');
					} else {
						fn_msg('I', 'Usuario sin perfilado.');
					}

					$scope.selected = false;
				})
				.error(function(data) {
					fn_msg('E', data);
				});

		};

		// Obtener menu
		$scope.getmenu2 = function() {
			$http.get('/api/menu2/' + $scope.newUsuario.User + '/2').success(function(data) {
					$scope.menu2 = data;

					if (data.length >= 1) {
						$scope.menus.show = true;
						fn_msg('S', 'Validación de perfilado.');
					} else {
						fn_msg('I', 'Usuario sin perfilado.');
					}

					$scope.selected = false;
				})
				.error(function(data) {
					fn_msg('E', data);
				});

		};

        $scope.get_tsec = function() {
            console.log('Consultando... get_tsec');					
            $http({
                method: "POST",
                url: "http://150.250.140.235:7500/TechArchitecture/mx/grantingTicket/V01",
                headers: {
                    'Content-Type': 'application / json'
                },
                data: JSON.parse($scope.tsec.body)
            }).then(function mySucces(response) {
                console.log(response);
                console.log(response.headers());
                $scope.tsec.respuesta = response.headers().tsec;
				console.log('Finalizado con exito! [TSEC]');			
            }, function myError(response) {
                $scope.tsec.respuesta = response.statusText;
                console.log($scope.tsec.respuesta);
				console.log('Ejecución fallida! [TSEC]');			
            });
            
        };
		
        $scope.get_move = function() {
            console.log('Ejecución [TRUCHA MOVE]');
			$scope.divCarga();			
			var fdata='{"message01":"'+$scope.move.body+'"}';				
            $http({
                method: "POST",
                url: "http://150.250.140.235:7800/Testing/move/V01",
                headers: {
                    'Content-Type': 'application / json',
                    'tsec': $scope.tsec.respuesta
                },				 
                data: JSON.parse(fdata)				
            }).then(function mySucces(response) {                
				console.log(response);
                console.log(response.headers());
                console.log(response.data);				
                $scope.move.respuesta = response.data.message01;
				$scope.quitaDivCarga();
				swal("Respuesta exitosa!", "Trucha Move", "success");				
				console.log('Prueba exitosa!');
            }, function myError(response) {
                console.log(response);
                $scope.move.respuesta = response.statusText;
                console.log($scope.move.respuesta);
				$scope.quitaDivCarga();
				swal("Respuesta fallida!", "", "error");
				console.log('Ejecución fallida!');
            });

            
			
			
        };

        $scope.get_moveheavier = function() {
           console.log('Ejecución [TRUCHA MOVEHEAVIER]');
			$scope.divCarga();			
			var fdata='{"msg0101":"'+$scope.moveheavier.body+'"}';

            $http({
                method: "POST",
                url: "http://150.250.140.235:7800/Testing/moveHeavier/V01",
                headers: {
                    'Content-Type': 'application / json',
                    'tsec': $scope.tsec.respuesta
                },
                data: JSON.parse(fdata)
            }).then(function mySucces(response) {
                console.log(response);
                $scope.moveheavier.respuesta = response.data.msg0101;
				$scope.quitaDivCarga();
				swal("Respuesta exitosa!", "Trucha MoveHeavier", "success");
				console.log('Prueba exitosa!');
            }, function myError(response) {
                console.log(response);
                $scope.moveheavier.respuesta = response.statusText;
                console.log($scope.moveheavier.respuesta);
				$scope.quitaDivCarga();
				swal("Respuesta fallida!", "", "error");
				console.log('Ejecución fallida!');
            });            
        };

        $scope.get_delay = function() {
           console.log('Ejecución [TRUCHA DELAY]');
			$scope.divCarga();
			var fdata='{"message01":"'+$scope.delay.body+'"}';

            $http({
                method: "POST",
                url: "http://150.250.140.235:7800/Testing/delay/V01",
                headers: {
                    'Content-Type': 'application / json',
                    'tsec': $scope.tsec.respuesta
                },
                data: JSON.parse(fdata)
            }).then(function mySucces(response) {
                console.log(response);
                $scope.delay.respuesta = response.status;
				$scope.quitaDivCarga();
				swal("Respuesta exitosa!", "Trucha Delay", "success");
				console.log('Prueba exitosa!');
            }, function myError(response) {
                console.log(response);
                $scope.moveheavier.respuesta = response.statusText;
                console.log($scope.moveheavier.respuesta);
				$scope.quitaDivCarga();
				swal("Respuesta fallida!", "", "error");
				console.log('Ejecución fallida!');
            });

            console.log('Terminado...');
        };
    };
})();
