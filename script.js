const dadosGames = [
    {
        "titulo": "Elden Ring",
        "descricao": "RPG de ação épico de mundo aberto com combates desafiadores e uma rica história de fantasia sombria.",
        "ano": 2022,
        "genero": "RPG de Ação",
        "plataforma": "PC, PlayStation, Xbox",
        "link": "https://www.eldenring.com/",
        "imagem": "https://image.api.playstation.com/vulcan/ap/rnd/202108/0410/0J03f20b423C5qn25B6sS8sL.jpg",
        "ia_analise": "Esta é uma análise gerada pela IA Gemini sobre a dificuldade e o 'replay value' do jogo, destacando a mecânica de chefes." // **Diferencial IA**
    },
    {
        "titulo": "Baldur's Gate 3",
        "descricao": "RPG tático baseado em turnos ambientado no universo de Dungeons & Dragons, conhecido por suas escolhas complexas.",
        "ano": 2023,
        "genero": "RPG Tático",
        "plataforma": "PC, PlayStation, Xbox",
        "link": "https://baldursgate3.game/",
        "imagem": "https://image.api.playstation.com/vulcan/ap/rnd/202302/2322/3045c7a5247553a20155248ed34988f33cf3ead2a235b6ce.jpg",
        "ia_analise": "O Gemini analisa: 'Vencedor do GOTY 2023, este jogo se destaca pela narrativa ramificada e pela liberdade de ação.' "
    },
    {
        "titulo": "Celeste",
        "descricao": "Desafiador jogo de plataforma 2D com uma narrativa profunda sobre ansiedade e auto-descoberta.",
        "ano": 2018,
        "genero": "Plataforma, Indie",
        "plataforma": "PC, PlayStation, Xbox, Nintendo",
        "link": "https://www.celestegame.com/",
        "imagem": "https://upload.wikimedia.org/wikipedia/commons/0/0f/Celeste_box_art_full.png",
        "ia_analise": "A IA pode resumir o impacto emocional: 'Um jogo indie aclamado, sua dificuldade está diretamente ligada à sua metáfora sobre superar obstáculos pessoais.' "
    },
    {
        "titulo": "The Legend of Zelda: Tears of the Kingdom",
        "descricao": "Aventura épica que expande o mundo de Hyrule com novas habilidades e mecânicas de construção.",
        "ano": 2023,
        "genero": "Ação, Aventura",
        "plataforma": "Nintendo",
        "link": "https://www.zelda.com/tears-of-the-kingdom/",
        "imagem": "https://assets.nintendo.com/image/upload/c_fill,w_1200/q_auto:best/f_auto/dpr_2.0/ncom/software/switch/70010000063714/e9828632495539c3831a7334a423c7b45128344535ec365cegbca38ac532249b",
        "ia_analise": "Gemini destaca: 'A liberdade criativa oferecida pela mecânica 'Ultrahand' redefine o gênero de mundo aberto, incentivando a experimentação.'"
    }
    // Adicione mais jogos aqui...
];
document.addEventListener('DOMContentLoaded', () => {
    const campoBusca = document.getElementById('campo-busca');
    const botaoBusca = document.getElementById('botao-busca');
    const containerResultados = document.getElementById('container-resultados');

    let jogosAtuais = []; // Armazena os jogos atualmente exibidos
    let ordenacaoAtual = 'release-desc'; // Ordenação padrão

    // Função que renderiza os resultados
    function mostrarResultados(jogos) {
        containerResultados.innerHTML = ''; // Limpa resultados anteriores

        if (jogos.length === 0) {
            containerResultados.innerHTML = '<p style="text-align: center; color: var(--tertiary-color);">Nenhum jogo encontrado. Tente refinar sua busca!</p>';
            return;
        }

        jogos.forEach((jogo, index) => {
            const card = document.createElement('article');
            card.className = 'card'; // Adiciona a classe .card
            // Adiciona um atraso para a animação fadeIn do CSS
            card.style.animationDelay = `${index * 0.1}s`; 
            
            // Note as novas propriedades: Gênero, Plataforma, e a Análise da IA
            card.innerHTML = `
                <img src="${jogo.imagem}" alt="Capa do jogo ${jogo.titulo}" class="card-imagem">
                <div class="card-conteudo">
                    <h2>${jogo.titulo} (${jogo.ano})</h2>
                    <p class="card-meta">${jogo.genero} | ${jogo.plataforma}</p>
                    <p>${jogo.descricao}</p>
                    
                    <div class="ia-box">
                        <strong>Análise Rápida (Gemini):</strong>
                        <p>${jogo.ia_analise}</p>
                    </div>
                    
                    <a href="${jogo.link}" target="_blank" class="card-link">Site Oficial »</a>
                </div>
            `;
            containerResultados.appendChild(card);
        });
    }

    // Função de Busca (mantendo a lógica de filtro de texto que você já tinha)
    function realizarBusca() {
        const termo = campoBusca.value.toLowerCase();

        // A busca deve ser feita na lista de jogos da página atual, não em todos
        const baseDeBusca = obterJogosDaPagina();
        
        // Filtra os jogos com base no título, descrição, gênero ou plataforma
        const resultadosFiltrados = baseDeBusca.filter(jogo => 
            jogo.titulo.toLowerCase().includes(termo) ||
            jogo.descricao.toLowerCase().includes(termo) ||
            jogo.genero.toLowerCase().includes(termo) ||
            jogo.plataforma.toLowerCase().includes(termo)
        );

        mostrarResultados(resultadosFiltrados);
    }

    // Eventos de clique e tecla Enter
    botaoBusca.addEventListener('click', realizarBusca);
    campoBusca.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            realizarBusca();
        }
    });

    // Função que retorna a lista de jogos baseada na página (PC, PS, etc.)
    function obterJogosDaPagina() {
        const paginaAtual = document.body.dataset.page; // Lê o atributo 'data-page' do body
        if (paginaAtual) { // Se o atributo existir (não estamos na index.html)
            return dadosGames.filter(jogo => 
                jogo.plataforma.toLowerCase().includes(paginaAtual)
            );
        }
        return dadosGames; // Se for a index, retorna todos
    }

    // Função para ordenar os jogos
    function ordenarJogos(jogos, ordenacao) {
        const jogosOrdenados = [...jogos]; // Cria uma cópia para não modificar o original

        switch (ordenacao) {
            case 'release-asc': // Mais antigos
                jogosOrdenados.sort((a, b) => a.ano - b.ano);
                break;
            case 'alpha-asc': // Ordem Alfabética
                jogosOrdenados.sort((a, b) => a.titulo.localeCompare(b.titulo));
                break;
            case 'release-desc': // Lançamentos (padrão)
            default:
                jogosOrdenados.sort((a, b) => b.ano - a.ano);
                break;
        }
        return jogosOrdenados;
    }

    // Função para carregar os jogos com base na página atual
    function carregarJogosIniciais() {
        // Se estiver na página de notícias, não faz nada (o conteúdo já está no HTML)
        if (document.body.dataset.page === 'noticias') {
            document.querySelector('.toolbar').style.display = 'none'; // Esconde a barra de ordenação
            document.querySelector('.search-container').style.display = 'none'; // Esconde a busca
            return;
        }

        jogosAtuais = obterJogosDaPagina();
        const jogosOrdenados = ordenarJogos(jogosAtuais, ordenacaoAtual);

        // Se for uma página de categoria e não houver jogos, mostra uma mensagem específica
        if (document.body.dataset.page && jogosAtuais.length === 0) {
            containerResultados.innerHTML = `<p style="text-align: center; color: var(--cor-texto-secundario);">Nenhum jogo encontrado para esta plataforma em nosso catálogo.</p>`;
            document.querySelector('.toolbar').style.display = 'none'; // Esconde a barra se não houver jogos
            return;
        }

        mostrarResultados(jogosOrdenados);
    }

    // Adiciona eventos aos botões de ordenação
    document.querySelectorAll('.sort-btn').forEach(button => {
        button.addEventListener('click', () => {
            ordenacaoAtual = button.dataset.sort;
            
            // Atualiza a classe 'active' nos botões
            document.querySelectorAll('.sort-btn').forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const jogosOrdenados = ordenarJogos(jogosAtuais, ordenacaoAtual);
            mostrarResultados(jogosOrdenados);
        });
    });

    // Carrega os jogos corretos ao iniciar a página
    carregarJogosIniciais();
});
    // Função para destacar o link do menu ativo
    function destacarMenuAtivo() {
        const paginaAtual = document.body.dataset.page;
        if (!paginaAtual) { // Se for a página inicial (index.html), não faz nada
            return;
        }

        const linksDoMenu = document.querySelectorAll('.main-nav a');
        linksDoMenu.forEach(link => {
            // Verifica se o href do link corresponde à página atual
            if (link.getAttribute('href').includes(paginaAtual)) {
                link.classList.add('active');
            }
        });
    }

    destacarMenuAtivo();

// *DICA PARA A LIGAÇÃO COM O GEMINI:*
// Em um cenário real, a função 'realizarBusca' faria uma chamada (fetch) a um backend
// que utilizaria a API do Google Gemini para enriquecer a busca ou gerar a 'ia_analise' 
// em tempo real, usando o Gemini para interpretar o input do usuário e gerar uma resposta.