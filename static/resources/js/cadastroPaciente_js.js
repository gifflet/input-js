function limpa_formulario_cep() {
	// Limpa valores do formulário de cep.
	document.getElementById('rua').value = ("");
	document.getElementById('bairro').value = ("");
	document.getElementById('cidade').value = ("");
	document.getElementById('estado').value = ("");

}

function handleResponseAddress(response) {
	if (!("erro" in response)) {
		// Atualiza os campos com os valores.
		document.getElementById('rua').value = (response.logradouro);
		document.getElementById('bairro').value = (response.bairro);
		document.getElementById('cidade').value = (response.localidade);
		document.getElementById('estado').value = (response.uf);
	} // end if.
	else {
		// CEP não Encontrado.
		limpa_formulario_cep();
		alert("CEP não encontrado.");
		//document.getElementById('cep').value = ("");
	}
}

function handleResponsePaciente(response) {
	alert('NEW HANDLER!')
}

function pesquisacep(valor) {

	// Nova variável "cep" somente com dígitos.
	var cep = valor.replace(/\D/g, '');

	// Verifica se campo cep possui valor informado.
	if (cep !== "") {

		// Expressão regular para validar o CEP.
		var validacep = /^[0-9]{8}$/;

		// Valida o formato do CEP.
		if (validacep.test(cep)) {

			// Preenche os campos com "..." enquanto consulta webservice.
			document.getElementById('rua').value = "...";
			document.getElementById('bairro').value = "...";
			document.getElementById('cidade').value = "...";
			document.getElementById('estado').value = "...";

			// Cria um elemento javascript.
			var script = document.createElement('script');

			// Sincroniza com o callback.
			script.src = '//viacep.com.br/ws/' + cep +
				'/json/?callback=handleResponseAddress';

			// Insere script no documento e carrega o conteúdo.
			document.body.appendChild(script);
		} // end if.
		else {
			// cep é inválido.
			limpa_formulario_cep();
			alert("Formato de CEP inválido.");
		}
	} // end if.
	else {
		// cep sem valor, limpa formulário.
		limpa_formulario_cep();
	}
}


function setDefaultInputValues() {
	cpf.value = "";
	rg.value = "";
	dataNascimento.value = "";
	corPele.selectedIndex = 0;
	nome.value = "";
	celular.value = "";
	telefone.value = "";
	document.getElementsByName('gender')[0].checked = true
	email.value = "";
	naturalidade.value = "";
	cep.value = "";
	rua.value = "";
	bairro.value = "";
	cidade.value = "";
	estado.value = "";
	numero.value = "";
	estadoCivil.selectedIndex = 0;
	tipoSanguineo.selectedIndex = 0;
}

function formatar(mascara, documento) {
	var i = documento.value.length;
	var saida = mascara.substring(0, 1);
	var texto = mascara.substring(i);

	if (texto.substring(0, 1) != saida) {
		documento.value += texto.substring(0, 1);
	}

}

function idade() {
	var data = document.getElementById("dataNascimento").value;
	var dia = data.substr(0, 2);
	var mes = data.substr(3, 2);
	var ano = data.substr(6, 4);
	var d = new Date();
	var ano_atual = d.getFullYear(),
		mes_atual = d.getMonth() + 1,
		dia_atual = d
		.getDate();

	ano = +ano, mes = +mes, dia = +dia;

	var idade = ano_atual - ano;

	if (mes_atual < mes || mes_atual == mes_aniversario && dia_atual < dia) {
		idade--;
	}
	return idade;
}

function goToHome() {
	var win = window.open('/home', "_self");
	win.focus();
}

function exibe(i) {

	document.getElementById(i).readOnly = true;

}

function desabilita(i) {

	document.getElementById(i).disabled = true;
}

function habilita(i) {
	document.getElementById(i).disabled = false;
}

function showhide() {
	var div = document.getElementById("newpost");

	if (idade() >= 18) {

		div.style.display = "none";
	} else if (idade() < 18) {
		div.style.display = "inline";
	}

}

$(document).ready(function () {
	$("#content div:nth-child(1)").show();
	$(".abas li:first div").addClass("selected");
	$(".aba").click(function () {
		$(".aba").removeClass("selected");
		$(this).addClass("selected");
		var indice = $(this).parent().index();
		indice++;
		$("#content div").hide();
		$("#content div:nth-child(" + indice + ")").show();
	});

	$(".aba").hover(function () {
		$(this).addClass("ativa")
	}, function () {
		$(this).removeClass("ativa")
	});

	$("#pacienteNaoEncontradoErro").hide();
});