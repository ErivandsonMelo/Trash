// Função para gerar a escolha do computador
function escolhaComputador() {
  const escolhas = ["Papel", "Pedra", "Tesoura"];
  const randomIndex = Math.floor(Math.random() * 3);
  return escolhas[randomIndex];
}

// Função para determinar o vencedor
function determinarVencedor(jogador, computador) {
  if (jogador === computador) {
    return "Empate";
  } else if (
    (jogador === "Papel" && computador === "Pedra") ||
    (jogador === "Pedra" && computador === "Tesoura") ||
    (jogador === "Tesoura" && computador === "Papel")
  ) {
    return "Jogador";
  } else {
    return "Computador";
  }
}

// Função principal do jogo
function jogarJokenpo() {
  let pontuacao = 0;
  const opcoes = ["1", "2", "3"];

  while (true) {
    const escolhaJogador = parseInt(
      prompt("Escolha sua jogada: 1 - Papel, 2 - Pedra, 3 - Tesoura")
    );

    if (!opcoes.includes(escolhaJogador.toString())) {
      alert("Opção inválida! Você perdeu a rodada.");
      break;
    }

    const jogadaJogador =
      escolhaJogador === 1
        ? "Papel"
        : escolhaJogador === 2
        ? "Pedra"
        : "Tesoura";
    const jogadaComputador = escolhaComputador();

    alert(
      `Você escolheu: ${jogadaJogador}\nComputador escolheu: ${jogadaComputador}`
    );

    const vencedor = determinarVencedor(jogadaJogador, jogadaComputador);

    if (vencedor === "Jogador") {
      pontuacao++;
      alert("Você ganhou esta rodada! Pontuação: " + pontuacao);
    } else if (vencedor === "Computador") {
      alert("Você perdeu para o computador!");
      break;
    } else {
      alert("Empate! Vamos para a próxima rodada.");
    }
  }

  alert("Fim do jogo! Sua pontuação total é: " + pontuacao);
}

// Iniciar o jogo
jogarJokenpo();
