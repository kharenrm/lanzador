var mongoose = require('mongoose');

module.exports = mongoose.model('Usuario', {
	User: String,
	Pass: String,
	Nombre: String,
	apPaterno: String,
	apMaterno: String,
	email: String,
	Grupo: String
});
