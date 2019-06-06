$(document).ready(function() {
	$('#botaoAdicionar').on('click', function(event){
		event.preventDefault();

		var form = document.querySelector("#formAtividade");
		var atividade = obterAtividade(form);
		var erro = validarAtividade(atividade);

		if (!erro) {
			montarLista(atividade);
			form.reset();
			form.atividade.focus();
		}
	});
});

function obterAtividade(form) {
	let Atividade = {
		atividade: form.atividade.value,
		data: form.data.value,
		hora: form.hora.value
	}

	return Atividade;
}

function validarAtividade(atividade) {
	var erro = false;
	
	if (atividade.atividade.length == 0 || atividade.data.length == 0 || atividade.hora.length == 0) {
		erro = true; 
	}

	return erro;
}

var listas = new Map();
function montarLista(atividade) {
	var li = '';
	var lista = '';
	var data = dataInTime(atividade.data, atividade.hora);
	listas.set(data, atividade);
	var mapAsc = new Map([...listas.entries()].sort());
	mapAsc.forEach(function(item, indice, array){
		li += '<li class="list-group-item" id="'+ indice +'">' 
				+ item.atividade
				+ '<br><span>' + dataEscrita(item.data) + ', ' + item.hora + '</span>'
				+ '</li>';
	});

	$('.list-atividade').html('');
	lista = $('.list-atividade').append(li);
}

function dataInTime(data, hora) {
	var d = data.split("-");
	var t = hora.split(":");
	var data = new Date(d[0], d[1], d[2], t[0], t[1]).getTime();

	return data;
}

function dataEscrita(data) {
	var meses = new Array("Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro");
	var d = data.split("-");
	var ano = d[0];
	var mes = meses[parseInt(d[1] - 1)];
	var dia = d[2];

	return dia + " de " + mes + " de " + ano;
}