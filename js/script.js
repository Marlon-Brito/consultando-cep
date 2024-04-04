// Selecionando os elementos
const cep = document.querySelector('#cep');

// Alimentando demais campos ao desfocar o cep, para isso usará o for in
const showData = (result) => {
    // Como vem em forma de objeto, para cada resultado será armazenado em um campo
    for (const campo in result){
        // Mas só exibirá a informação do campo se ele existir, senão irá descartar
        if (document.querySelector('#' + campo)){
            // Preenchendo dinâmicamente o formulário com estes campos que existem
            document.querySelector('#' + campo).value = result[campo];
            // result traz os dados do viacep, que na verdade será o data, então trata isso como um array e joga o campo dentro, assim autopreenchendo os elementos que possuem o mesmo nome das props
        }
    }
}

// Ao perder o foco fará a busca do cep
cep.addEventListener('blur', (e) => {
    // Trocando o espaço por nada na consulta
    let search = cep.value.replace('-', '');
    // O ideal ao usar o fecth api e consultar um endereço remoto é se passar parâmetros
    const options = {
        method: 'GET',
        mode: 'cors', // cors = trabalhando com servidores diferentes
        cache: 'default'
    }
    // Acesssando essa url ou endpoint dinâmico com essas opções
    fetch(`https:viacep.com.br/ws/${search}/json/`, options)
    // E como é uma promessa que retornará, algo assíncrono, não tendo controle, se der certo é then
    .then(response => response.json()
        // Caso certo trará uma resposta. Vendo se consegue trazer em json que também é uma promessa
        .then(data => showData(data))
    )
    // Agora se der errado se usa o catch
    .catch(e => console.log('Deu erro: ' + e.message))
});