'use strict';

const pesquisarCep = async (cep) => {
    

    const url = `https://viacep.com.br/ws/${cep}/json/`
    const response = await fetch(url);
    const data = await response.json();
    return data;
    

}


const cepValido = (cep) => /^[0-9]{8}$/.test(cep);

const limparFormulario = () => {
    document.querySelector('#endereco').value = '';
    document.querySelector('#bairro').value = '';
    document.querySelector('#cidade').value = '';
    document.querySelector('#estado').value = '';

}

const preencherFormulario = async (evento) => {
    const cep = evento.target.value.replace('-', '');
    limparFormulario();
    if (cepValido(cep)) {

    const infoCep = await pesquisarCep(cep);
    if (infoCep.erro) {
        document.querySelector('#endereco').value = 'Cep não encontrado!';
    }else {
     document.querySelector('#endereco').value = infoCep.logradouro;
     document.querySelector('#bairro').value = infoCep.bairro;
     document.querySelector('#cidade').value = infoCep.localidade;
     document.querySelector('#estado').value = infoCep.uf;
     console.log(infoCep);
     }
    }else{
       document.querySelector('#endereco').value = 'Cep invalido!!!';
    }
}

document.querySelector('#cep').addEventListener('focusout', preencherFormulario);

// invocar ()