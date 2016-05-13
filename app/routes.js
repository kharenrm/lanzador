var Controller = require('./controller');
module.exports = function(app) {
        console.log('Cargando Controller...');
		// Login 
		app.get('/api/login/:user/:pass', Controller.setLogin);
		
		// Obtener menu1
		app.get('/api/menu1/:user/:cd_gpo_menu', Controller.getMenu);
		
		// Obtener menu2
		app.get('/api/menu2/:user/:cd_gpo_menu', Controller.getMenu);
		
        // Application
       /* app.get('*', function(req, res) {
                res.sendfile('./public/index.html'); // Carga unica de la vista
        });*/
};