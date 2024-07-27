(function () {
    let FPS = 10;
    const DIMENSAO = 40;
    const QUADROS = 60;
    let quadrosPassados = 0;

    let tabuleiro;
    let cobra;
    let item;
    let intervaloDoJogo;
    let pontuacao = 0;
    let jogoIniciado = false;
    let estaPausado = false;
    let jogoFinalizado = false;

    const displayPontuacao = document.getElementById('pc');
    displayPontuacao.innerHTML = `Pontuação: 00000`;

    const displayFimDeJogo = document.getElementById('fimdejogo');

    const divGameOver = document.createElement('div');
    divGameOver.setAttribute('id', 'gameover');
    divGameOver.innerHTML = 'Game Over';
    document.body.appendChild(divGameOver);

    // Ponto de entrada para iniciar o jogo
    function iniciarJogo() {
        if (tabuleiro) {
            limparTabuleiro();
        }
        tabuleiro = new Tabuleiro(DIMENSAO);
        cobra = new Cobra([[4, 4], [4, 5], [4, 6]]);
        gerarItem();
    }

    // Evento para iniciar o jogo
    window.addEventListener("keydown", (e) => {
        if (!jogoIniciado && e.key === "s") {
            if (jogoFinalizado) {
                reiniciarJogo();
            } else {
                intervaloDoJogo = setInterval(executar, 1000 / FPS);
                jogoIniciado = true;
            }
        }
    });

    // Pausa e reinicia o jogo
    window.addEventListener("keydown", (e) => {
        if (e.key === "p") {
            alternarPausa();
        }
    });

    // Movimentos
    window.addEventListener("keydown", (e) => {
        switch (e.key) {
            case "ArrowUp":
                cobra.alterarDirecao(0);
                break;
            case "ArrowRight":
                cobra.alterarDirecao(1);
                break;
            case "ArrowDown":
                cobra.alterarDirecao(2);
                break;
            case "ArrowLeft":
                cobra.alterarDirecao(3);
                break;
            default:
                break;
        }
    });

    // Inicializar tabuleiro
    class Tabuleiro {
        constructor(tamanho) {
            this.elemento = document.createElement("table");
            this.elemento.setAttribute("id", "board");
            this.cor = "#ccc";
            document.body.appendChild(this.elemento);
            for (let i = 0; i < tamanho; i++) {
                const linha = document.createElement("tr");
                this.elemento.appendChild(linha);
                for (let j = 0; j < tamanho; j++) {
                    const celula = document.createElement("td");
                    linha.appendChild(celula);
                }
            }
        }
    }

    // Classe para a cobra e sua direção
    class Cobra {
        constructor(corpo) {
            this.corpo = corpo;
            this.cor = "#222";
            this.direcao = 1; // 0 para cima, 1 para direita, 2 para baixo, 3 para esquerda
            this.atualizarCoresDoCorpo();
        }

        atualizarCoresDoCorpo() {
            this.corpo.forEach(ponto => document.querySelector(`#board tr:nth-child(${ponto[0]}) td:nth-child(${ponto[1]})`).style.backgroundColor = this.cor);
        }

        mover() {
            const cabeca = this.corpo[this.corpo.length - 1];
            let novaCabeca;

            // Direção da cobra
            switch (this.direcao) {
                case 0:
                    novaCabeca = [cabeca[0] - 1, cabeca[1]]; // cima
                    break;
                case 1:
                    novaCabeca = [cabeca[0], cabeca[1] + 1]; // direita
                    break;
                case 2:
                    novaCabeca = [cabeca[0] + 1, cabeca[1]]; // baixo
                    break;
                case 3:
                    novaCabeca = [cabeca[0], cabeca[1] - 1]; // esquerda
                    break;
                default:
                    break;
            }

            // Verifica se a cobra colidiu com o tabuleiro
            if (novaCabeca[0] < 1 || novaCabeca[0] > DIMENSAO || novaCabeca[1] < 1 || novaCabeca[1] > DIMENSAO) {
                displayFimDeJogo.innerHTML = `Fim de jogo!`;
                divGameOver.style.display = 'block';
                clearInterval(intervaloDoJogo);
                jogoIniciado = false;
                jogoFinalizado = true;
                return;
            }

            // Verifica se a cobra colidiu consigo mesma
            for (let i = 0; i < this.corpo.length - 1; i++) {
                if (novaCabeca[0] === this.corpo[i][0] && novaCabeca[1] === this.corpo[i][1]) {
                    displayFimDeJogo.innerHTML = `Fim de jogo!`;
                    divGameOver.style.display = 'block';
                    clearInterval(intervaloDoJogo);
                    jogoIniciado = false;
                    jogoFinalizado = true;
                    return;
                }
            }

            // Verifica se a cobra pegou o item
            if (novaCabeca[0] === item.posicao[0] && novaCabeca[1] === item.posicao[1]) {
                pontuacao += item.valor;
                displayPontuacao.innerHTML = `Pontuação: ${pontuacao.toString().padStart(5, '0')}`;
                document.querySelector(`#board tr:nth-child(${item.posicao[0]}) td:nth-child(${item.posicao[1]})`).style.backgroundColor = this.cor;
                this.corpo.push(novaCabeca); // Crescer a cobra
                gerarItem(); // Gerar novo item no tabuleiro
            } else {
                this.corpo.push(novaCabeca); // Adiciona uma nova cabeça
                const caudaAntiga = this.corpo.shift(); // Remove a cauda da cobra
                document.querySelector(`#board tr:nth-child(${novaCabeca[0]}) td:nth-child(${novaCabeca[1]})`).style.backgroundColor = this.cor; // Nova cabeça
                document.querySelector(`#board tr:nth-child(${caudaAntiga[0]}) td:nth-child(${caudaAntiga[1]})`).style.backgroundColor = tabuleiro.cor; // Antiga cauda
            }
            this.atualizarCoresDoCorpo();
        }

        // Direções da cobra
        alterarDirecao(novaDirecao) {
            const direcaoOposta = {
                0: 2, // cima e baixo são opostos
                1: 3, // direita e esquerda são opostos
                2: 0, // baixo e cima são opostos
                3: 1  // esquerda e direita são opostos
            };
            if (novaDirecao !== direcaoOposta[this.direcao]) { // Verifica direções válidas
                this.direcao = novaDirecao;
            }
        }
    }

    class Item {
        constructor(posicao, tipo) {
            this.posicao = posicao;
            this.tipo = tipo;
            this.cor = tipo ? "red" : "#222"; // Cor do item
            this.valor = tipo ? 2 : 1;
            document.querySelector(`#board tr:nth-child(${posicao[0]}) td:nth-child(${posicao[1]})`).style.backgroundColor = this.cor;
        }
    }

    // Função para gerar novos itens
    function gerarItem() {
        const x = Math.floor(Math.random() * DIMENSAO) + 1;
        const y = Math.floor(Math.random() * DIMENSAO) + 1;
        const tipo = Math.random() < 0.2;
        item = new Item([x, y], tipo);
    }

    // Função para alternar pausa
    function alternarPausa() {
        estaPausado = !estaPausado;
        if (estaPausado) {
            clearInterval(intervaloDoJogo);
        } else {
            intervaloDoJogo = setInterval(executar, 1000 / FPS);
        }
    }

    function executar() {
        if (!estaPausado && jogoIniciado) {
            cobra.mover();
            quadrosPassados++;
            // Verifica se o número de quadros (QUADROS) passados é maior/igual ao número de quadros (QUADROS) permitido
            if (quadrosPassados >= QUADROS) {
                FPS += 0.5;
                clearInterval(intervaloDoJogo);
                intervaloDoJogo = setInterval(executar, 1000 / FPS);
                quadrosPassados = 0;
            }
        }
    }

    // Função para reiniciar o jogo
    function reiniciarJogo() {
        clearInterval(intervaloDoJogo);
        displayPontuacao.innerHTML = `Pontuação: 00000`;
        displayFimDeJogo.innerHTML = '';
        divGameOver.style.display = 'none';
        pontuacao = 0;
        FPS = 10;
        quadrosPassados = 0;
        jogoFinalizado = false;
        estaPausado = false;
        iniciarJogo();
    }

    // Função para limpar tabuleiro
    function limparTabuleiro() {
        const tabela = document.getElementById('board');
        if (tabela) {
            tabela.parentNode.removeChild(tabela);
        }
    }

    iniciarJogo();
})();
