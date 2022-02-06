// esconde o botao de whatsapp no topo da pagina
window.onscroll = function() {toggleHideClass()};
function toggleHideClass() {
  if (document.body.scrollTop > 400 || document.documentElement.scrollTop > 400) {
    document.getElementById('botao-pedido-fixo').classList.remove('hide');
  } else {
    document.getElementById('botao-pedido-fixo').classList.add('hide');
  }
}

// sanitiza CEP e dá submit se user pressionar Enter no input
var CEP_input = document.getElementById("CEP_input");
CEP_input.onkeyup = function(event) {
  // retira qualquer caractere nao-numerico
  CEP_input.value = CEP_input.value.replace(/[\D\s\.\_\-]+/g, '')

  if (event.key === "Enter") {
    retorna_info_CEP(CEP_input.value);
  };
}

// retorna prazo e frete para o cep informado
var CEP_submit = document.getElementById("CEP_submit")
CEP_submit.onclick = function() {retorna_info_CEP(CEP_input.value)};

function retorna_info_CEP(CEP_value) {
  
  var valores_por_regiao = {
    "Encantado": {
      frete: "5,00",
      prazo: "5 dias"
    },
    "Lajeado": {
      frete: "8,00",
      prazo: "6 dias"
    },
    "Campo Bom": {
      frete: "5,00",
      prazo: "10 dias"
    },
    "Novo Hamburgo": {
      frete: "5,00",
      prazo: "10 dias"
    },
    "São Leopoldo": {
      frete: "10,00",
      prazo: "10 dias"
    },
    "Canoas": {
      frete: "10,00",
      prazo: "10 dias"
    }
  }

  if (CEP_value.length < 8) {
    alert("CEP inválido")
  }
  else {
    // os 5 primeiros digitos de um CEP já identificam a cidade/região
    var identificador_regiao = parseInt(CEP_value.substring(0,5));
    regiao_encontrada = regiao_dado_CEP(identificador_regiao);
    resultado_consulta = document.getElementById("resultado-consulta")
    resultado_regiao = document.getElementById("resultado-regiao")
    resultado_frete = document.getElementById("resultado-frete")
    resultado_prazo = document.getElementById("resultado-prazo")
    if ( valores_por_regiao[regiao_encontrada] ) {
      resultado_regiao.textContent = regiao_encontrada
      resultado_frete.textContent = valores_por_regiao[regiao_encontrada].frete
      resultado_prazo.textContent = valores_por_regiao[regiao_encontrada].prazo
    }
    else {
      resultado_consulta.textContent = "Favor solicitar o valor do frete."
    }
  }
};

function regiao_dado_CEP(CEP) {
  var faixas_CEP = [
    { "regiao": "Encantado",      "limite_inferior": 95960, "limite_superior": 95964 },
    { "regiao": "Lajeado",        "limite_inferior": 95900, "limite_superior": 95914 },
    { "regiao": "Campo Bom",      "limite_inferior": 93700, "limite_superior": 93799 },
    { "regiao": "Novo Hamburgo",  "limite_inferior": 93300, "limite_superior": 93599 },
    { "regiao": "São Leopoldo",   "limite_inferior": 93000, "limite_superior": 93179 },
    { "regiao": "Canoas",         "limite_inferior": 92000, "limite_superior": 92479 }
  ]

  var i = 0
  while (i < faixas_CEP.length) {
    if (CEP >= faixas_CEP[i].limite_inferior && CEP <= faixas_CEP[i].limite_superior) {
      return faixas_CEP[i].regiao;
    }
    else { i++ }
  }
  return undefined;
};
