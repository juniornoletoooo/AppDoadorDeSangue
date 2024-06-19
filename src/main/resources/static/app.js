document.addEventListener('DOMContentLoaded', function () {
    const loginTela = document.getElementById('loginTela');
    const registroTela = document.getElementById('registroTela');
    const cadastroPessoalTela = document.getElementById('cadastroPessoalTela');
    const cadastroTela = document.getElementById('cadastroTela');
    const listagemTela = document.getElementById('listagemTela');
    const btnMostrarRegistro = document.getElementById('btnMostrarRegistro');
    const btnMostrarLogin = document.getElementById('btnMostrarLogin');
    const btnMinhasDoacoes = document.getElementById('btnMinhasDoacoes');
    const btnCadastro = document.getElementById('btnCadastro');
    const formLogin = document.getElementById('formLogin');
    const formRegistro = document.getElementById('formRegistro');
    const formCadastroPessoal = document.getElementById('formCadastroPessoal');
    const formCadastro = document.getElementById('formCadastro');
    const listaDoadores = document.getElementById('listaDoadores');
    const filtroTipo = document.getElementById('filtroTipo');
    const filtroLocalizacao = document.getElementById('filtroLocalizacao');
    const btnFiltrar = document.getElementById('btnFiltrar');
    const loginEmail = document.getElementById('loginEmail');
    const loginSenha = document.getElementById('loginSenha');
    const registroEmail = document.getElementById('registroEmail');
    const registroSenha = document.getElementById('registroSenha');
    const nomeCompleto = document.getElementById('nomeCompleto');
    const dataNascimento = document.getElementById('dataNascimento');
    const sexo = document.getElementById('sexo');
    const tipoSanguineo = document.getElementById('tipoSanguineo');
    const local = document.getElementById('local');
    const cidade = document.getElementById('cidade');
    const receptor = document.getElementById('receptor');
    const dadosPessoaisDiv = document.getElementById('dadosPessoais');

    // Simulação de dados salvos localmente (normalmente substituído por backend ou localStorage)
    let dadosPessoais = {
        nomeCompleto: '',
        dataNascimento: '',
        sexo: '',
        tipoSanguineo: ''
    };

    // Chave da API do Mapbox
    const MAPBOX_API_KEY = 'SUA_CHAVE_MAPBOX_AQUI';

    // Função para buscar locais na API do Mapbox
    async function buscarLocais(query) {
        const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?access_token=${MAPBOX_API_KEY}`);
        const data = await response.json();
        return data.features;
    }

    // Função para exibir sugestões de locais
    function exibirSugestoes(sugestoes) {
        const sugestoesContainer = document.getElementById('sugestoesLocal');
        sugestoesContainer.innerHTML = '';
        sugestoes.forEach(sugestao => {
            const item = document.createElement('div');
            item.className = 'sugestao-item';
            item.textContent = sugestao.place_name;
            item.addEventListener('click', () => {
                local.value = sugestao.place_name;
                sugestoesContainer.innerHTML = '';
            });
            sugestoesContainer.appendChild(item);
        });
    }

    // Event listener para o campo de busca de local
    local.addEventListener('input', async (e) => {
        const query = e.target.value;
        if (query.length > 2) {
            const sugestoes = await buscarLocais(query);
            exibirSugestoes(sugestoes);
        } else {
            document.getElementById('sugestoesLocal').innerHTML = '';
        }
    });

    // Mostra a tela de login ao carregar a página
    loginTela.style.display = 'block';

    // Event listeners para alternar entre as telas
    btnMostrarRegistro.addEventListener('click', () => {
        loginTela.style.display = 'none';
        registroTela.style.display = 'block';
    });

    btnMostrarLogin.addEventListener('click', () => {
        registroTela.style.display = 'none';
        loginTela.style.display = 'block';
    });

    btnMinhasDoacoes.addEventListener('click', () => {
        cadastroTela.style.display = 'none';
        listagemTela.style.display = 'block';
    });

    btnCadastro.addEventListener('click', () => {
        listagemTela.style.display = 'none';
        cadastroTela.style.display = 'block';
        exibirDadosPessoais(); // Exibe os dados pessoais ao abrir a tela de Nova Doação
    });

    // Event listener para o formulário de login
    formLogin.addEventListener('submit', (e) => {
        e.preventDefault();
        // Lógica para autenticação do usuário (simulação)
        const email = loginEmail.value;
        const senha = loginSenha.value;

        // Simulação de autenticação e verificação de primeiro login
        const isFirstLogin = localStorage.getItem('firstLogin') !== 'false'; // Padrão para true

        if (isFirstLogin) {
            localStorage.setItem('firstLogin', 'false');
            loginTela.style.display = 'none';
            cadastroPessoalTela.style.display = 'block';
        } else {
            loginTela.style.display = 'none';
            cadastroTela.style.display = 'block';
            exibirDadosPessoais(); // Exibe os dados pessoais ao abrir a tela de Nova Doação
        }
    });

    // Event listener para o formulário de registro
    formRegistro.addEventListener('submit', (e) => {
        e.preventDefault();
        // Lógica para registrar o usuário (simulação)
        const email = registroEmail.value;
        const senha = registroSenha.value;
        localStorage.setItem('firstLogin', 'true'); // Define como true para primeiro login
        registroTela.style.display = 'none';
        loginTela.style.display = 'block';
    });

    // Event listener para o formulário de cadastro pessoal
    formCadastroPessoal.addEventListener('submit', (e) => {
        e.preventDefault();
        dadosPessoais = {
            nomeCompleto: formCadastroPessoal.querySelector('#nomeCompleto').value,
            dataNascimento: formCadastroPessoal.querySelector('#dataNascimento').value,
            sexo: formCadastroPessoal.querySelector('#sexo').value,
            tipoSanguineo: formCadastroPessoal.querySelector('#tipoSanguineo').value
        };
        localStorage.setItem('dadosPessoais', JSON.stringify(dadosPessoais));
        cadastroPessoalTela.style.display = 'none';
        cadastroTela.style.display = 'block';
        exibirDadosPessoais(); // Exibe os dados pessoais ao abrir a tela de Nova Doação
    });

    // Event listener para o formulário de cadastro de doação
    formCadastro.addEventListener('submit', (e) => {
        e.preventDefault();
        const novaDoacao = {
            local: local.value,
            cidade: cidade.value,
            receptor: receptor.value
        };
        adicionarDoacaoNaLista(novaDoacao);
        formCadastro.reset();
    });

    // Função para adicionar doação na lista
    function adicionarDoacaoNaLista(doacao) {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${doacao.local}</td>
            <td>${doacao.cidade}</td>
            <td>${doacao.receptor}</td>
            <td>
                <button class="btnExcluir">Excluir</button>
            </td>
        `;
        listaDoadores.appendChild(tr);

        // Adiciona event listener para o botão de excluir
        const btnExcluir = tr.querySelector('.btnExcluir');
        btnExcluir.addEventListener('click', () => excluirDoacao(tr));
    }

    // Função para excluir uma doação
    function excluirDoacao(tr) {
        tr.remove();
    }

    // Função para aplicar filtro
    btnFiltrar.addEventListener('click', () => {
        const tipo = filtroTipo.value;
        const localizacao = filtroLocalizacao.value.toLowerCase();
        const linhas = listaDoadores.querySelectorAll('tr');
        linhas.forEach(linha => {
            const colunaLocalizacao = linha.children[0].textContent.toLowerCase();
            if ((localizacao === '' || colunaLocalizacao.includes(localizacao))) {
                linha.style.display = '';
            } else {
                linha.style.display = 'none';
            }
        });
    });

    // Exibe dados pessoais se já estiverem salvos
    exibirDadosPessoais();
});

// Função para exibir dados pessoais na tela de Nova Doação
function exibirDadosPessoais() {
    const dadosPessoaisContainer = document.getElementById('dadosPessoais');
    if (localStorage.getItem('dadosPessoais')) {
        const dados = JSON.parse(localStorage.getItem('dadosPessoais'));
        const dataFormatada = formatarData(dados.dataNascimento);
        dadosPessoaisContainer.innerHTML = `
            <p><strong>Nome Completo:</strong> ${dados.nomeCompleto}</p>
            <p><strong>Data de Nascimento:</strong> ${dataFormatada}</p>
            <p><strong>Sexo:</strong> ${dados.sexo}</p>
            <p><strong>Tipo Sanguíneo:</strong> ${dados.tipoSanguineo}</p>
        `;
    }
}

// Função para formatar a data de nascimento (dd/mm/aaaa)

// Função para exibir dados pessoais na tela de Nova Doação
function exibirDadosPessoais() {
    const dadosPessoaisContainer = document.getElementById('dadosPessoais');
    if (localStorage.getItem('dadosPessoais')) {
        const dados = JSON.parse(localStorage.getItem('dadosPessoais'));
        const dataFormatada = formatarData(dados.dataNascimento); // Formata a data
        dadosPessoaisContainer.innerHTML = `
            <p><strong>Nome Completo:</strong> ${dados.nomeCompleto}</p>
            <p><strong>Data de Nascimento:</strong> ${dataFormatada}</p>
            <p><strong>Sexo:</strong> ${dados.sexo}</p>
            <p><strong>Tipo Sanguíneo:</strong> ${dados.tipoSanguineo}</p>
        `;
    }
}

// Função para formatar a data de nascimento (dd/mm/aaaa)
function formatarData(data) {
    const dataObj = new Date(data);
    const dia = dataObj.getDate().toString().padStart(2, '0');
    const mes = (dataObj.getMonth() + 1).toString().padStart(2, '0'); // Mês começa do zero, por isso +1
    const ano = dataObj.getFullYear();
    return `${dia}/${mes}/${ano}`;
}
