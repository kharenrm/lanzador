var mongoose = require('mongoose');

module.exports = mongoose.model('Menu', {
	nb_opc_menu: String,
	url: String
});