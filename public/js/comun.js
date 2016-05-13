function fn_carga_form(nb_iframe, txt_url) {
	//alert('Sirve');
	$("#" + nb_iframe).attr("src", txt_url);
	$("#" + nb_iframe).attr("seamless", "false");
}
function resizeIframe(idIframe,menu){
	var plus=0;
	if(menu=='1'){
		plus=125
	}else if(menu=='2'){
		plus=220;
	}
			  var miIframe=document.getElementById(idIframe);
			  var alturaPagina=miIframe.contentWindow.document.body.scrollHeight+plus;
			  miIframe.style.height=alturaPagina+"px"; 
}

function fn_msg(tp_msg, txt_msg) {
	var txt_titulo = '';
	var tp_modal = '';

	switch (tp_msg) {
		case 'I':
			txt_titulo = 'Informativo:';
			tp_modal = 'info';
			break;
		case 'W':
			txt_titulo = 'Warning:';
			tp_modal = 'warning';
			break;
		case 'E':
			txt_titulo = 'Error:';
			tp_modal = 'error';
			break;
		case 'S':
			txt_titulo = 'Operación Exitosa:';
			tp_modal = 'success';
			break;
		default:
			txt_titulo = 'Desconocido';
			tp_modal = 'error';
	}

	swal({
		title: txt_titulo,
		text: txt_msg,
		timer: 2500,
		type: tp_modal,
		animation: true,
		showConfirmButton: false,
		allowOutsideClick: true,
		imageUrl: './img/logo1.jpg'
	});
}