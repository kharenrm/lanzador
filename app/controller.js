// Definiendo los metodos POST, GET
var Usuario = require('./modelo/usuario');
var Menu = require('./modelo/menu');

//Definiendo conexión a postgresql
var pg = require('pg');
var aDBparams = { host: 'localhost',user: 'postgres',password: 'admin123',database: 'lanzadorCloud'};
var client = new pg.Client(aDBparams);
client.connect();
console.log("Conectado a PostgreSQL!");

// Consulta de acceso a usuarios.
exports.setLogin = function(req, res) {
	console.log('[GET] - Consulta Usuario');			
	client.query("SELECT * FROM usuarios WHERE usu='"+req.params.user+"' AND pass='"+req.params.pass+"'", function(err, result) {	
    if( result == undefined ){        
        console.log("Usuario no existe!");
    }else if(result!=undefined){        
        console.log(result.rows[0]);
    }
    res.json(result.rows)
    pg.end();
	});
}

// Consulta de menu.
exports.getMenu = function(req, res) {
		console.log('[GET] - Consulta de Menu');			
		client.query("SELECT * FROM menus WHERE usuarios LIKE '%"+req.params.user+"%' and cd_gpo_menu='"+req.params.cd_gpo_menu+"'", function(err, result) {		
		if( result == undefined ){        
			console.log("Usuario sin perfilado!");
		}else if(result!=undefined){        
			console.log(result.rows[0]);
		}
		res.json(result.rows)
		pg.end();
		});		
	}
	
//{$set:{Nombre : req.body.User,apPaterno: req.body.appaterno, apMaterno: req.body.apmaterno}},