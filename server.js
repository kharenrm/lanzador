//Inicializacion
var express = require('express');
var app = express(); // Utilizamos express
var port = process.env.PORT || 8081; // Cogemos el puerto 8080

// Localizacion de los ficheros estaticos
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/../comun'));
app.use(express.static(__dirname + '/../../../node_modules'));

app.set('title', 'Lanzador de Transacciones Trucha');
// Cargamos los endpoints
require('./app/routes.js')(app);
// Escucha en el puerto 80 y corre el server
app.listen(port, function() {
        console.log('App escuchando por el puerto: ' + port);
});