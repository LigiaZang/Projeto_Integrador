// Faz o chamado da URL
function buscarCep() {
    
    //Nova variável "cep" somente com dígitos.
    var cep = document.getElementById("cep").value.replace(/\D/g, '');

    //Verifica se campo cep possui valor informado.
    if (cep != "") {

        //Expressão regular para validar o CEP.
        var validacep = /^[0-9]{8}$/;

        //Valida o formato do CEP.
        if(validacep.test(cep)) {
          
          var url = "https://viacep.com.br/ws/" + cep + "/json/";
      
          //fetch chama http e pega os dados
          fetch(url)
            .then(response => response.json())
            //variavel "data" é alimentada pela função buscarCep
            .then(data => {
          
              document.getElementById("textoCep").innerText    = data.cep;
              document.getElementById("logradouro").innerText  = data.logradouro ?? '';
              document.getElementById("complemento").innerText = data.complemento ?? '';
              document.getElementById("bairro").innerText      = data.bairro ?? '';
              document.getElementById("localidade").innerText  = data.localidade;
              document.getElementById("uf").innerText          = data.uf;
              document.getElementById("ibge").innerText        = data.ibge;
              document.getElementById("ddd").innerText         = data.ddd;
            }).catch(error => console.error('Erro:', error));
            
        } //end if.
        else {
            //cep é inválido.
            alert("CEP Inválido.");
        }
    } //end if.
    else {
        //cep sem valor, limpa formulário.
        alert("Formato de CEP inválido.");
    }
    
}


