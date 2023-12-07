function persistirDadosTXT() {
  //Preencher Dados TXT 
  resultadodapesquisa = "Resultado da pesquisa:\n\n";
  resultadodapesquisa += "Cep: "        +document.getElementById("textoCep").innerText+"\n";
  resultadodapesquisa += "Logradouro: " +document.getElementById("logradouro").innerText+"\n";
  resultadodapesquisa += "Complemento: "+document.getElementById("complemento").innerText+"\n";
  resultadodapesquisa += "Bairro: "     +document.getElementById("bairro").innerText+"\n";
  resultadodapesquisa += "Localidade: " +document.getElementById("localidade").innerText+"\n";
  resultadodapesquisa += "UF: "         +document.getElementById("uf").innerText+"\n";
  resultadodapesquisa += "IBGE: "       +document.getElementById("ibge").innerText+"\n";
  resultadodapesquisa += "DDD: "        +document.getElementById("ddd").innerText+"\n";

  return resultadodapesquisa;
}

async function salvarResultado() {
  // Criar um arquivo de texto com os dados capturados na função persistirDadosTXT
  var blob = new Blob([persistirDadosTXT()], { type: 'text/plain' });
    
  // Criar um link de download do arquivo
  var link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.download = 'resultado_pesquisa.txt';
    
  // Adicionar o link ao documento
  document.body.appendChild(link);
    
  // Simular um clique no link para iniciar o download
  link.click();
    
  // Remover o link do documento
  document.body.removeChild(link);

  try {
    console.log('SEND API');

    // SEND TO API
    const data = {
      cep: document.getElementById("textoCep").innerText,
      logradouro: document.getElementById("logradouro").innerText,
      complemento: document.getElementById("complemento").innerText,
      bairro: document.getElementById("bairro").innerText,
      localidade: document.getElementById("localidade").innerText,
      uf: document.getElementById("uf").innerText,
      ibge: document.getElementById("ibge").innerText,
      ddd: document.getElementById("ddd").innerText,
    };

    console.log('DATA', data);

    const response = await fetch('http://localhost:3000/enderecos', {
      method: "POST",
      mode: 'no-cors',
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        ...data
      },
    });
  } catch (e) {
    console.error(e);
  }
}
