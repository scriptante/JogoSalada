const imgFrutas = Array.from(document.querySelector("#divFrutas").children);
const listFrutasQuant = document.querySelector("#outFrutas");
const jogo = document.querySelector("#divJogo");
const btVerificar = document.querySelector("#btVerificar");
const btNovamente = document.querySelector("#btNovamente");
const mensaOk = document.querySelector("#mensaOk");
const mensaErro = document.querySelector("#mensaErro");

let receita = [];
let jogoFrutas = [];
let contFrutasId = 0;

for (const fruta of imgFrutas) {
  montarReceita(fruta.name);

  fruta.addEventListener("click", () => {
    const novaFruta = fruta.cloneNode(true);
    montarFrutaNoJogo(novaFruta);
    if (contFrutasId >= 1) {
      btVerificar.classList.remove("d-none");
    }
  });
}

function montarReceita(nomeFruta) {
  const quantidade = Math.floor(Math.random() * 3) + 1;
  const texto = `: ${nomeFruta}: ${quantidade} :`;
  receita.push({ nome: nomeFruta, quantidade });
  listFrutasQuant.append(texto);
}

function montarFrutaNoJogo(novaFruta) {
  novaFruta.value = ++contFrutasId;
  jogoFrutas.push({ id: novaFruta.value, nome: novaFruta.name });
  jogo.appendChild(novaFruta);

  novaFruta.addEventListener("click", () => {
    jogoFrutas = jogoFrutas.filter((item) => item.id != novaFruta.value);
    novaFruta.remove();
    if (jogoFrutas.length == 0) {
      btVerificar.classList.add("d-none");
    }
  });
}

btVerificar.addEventListener("click", () => {
  let receitaDoJogador = [];
  let frutaAnterior;

  for (const fruta of jogoFrutas) {
    // Verifica as quantidades
    receitaDoJogador = receita.map((item) => {
      if (item.nome == fruta.nome) {
        --item.quantidade;
      }
      return item;
    });

    // Verifica se as frutas estão misturadas
    if (frutaAnterior) {
      if (frutaAnterior == fruta.nome) {
        mensaErro.classList.remove("d-none");
        break;
      }
    }
    frutaAnterior = fruta.nome;
  }

  for (const ingrediente of receitaDoJogador) {
    if (ingrediente.quantidade != 0) {
      mensaErro.classList.remove("d-none");
      break;
    }
  }

  if (mensaErro.classList.contains("d-none")) {
    mensaOk.classList.remove("d-none");
  }
  btVerificar.classList.add("d-none");
  btNovamente.classList.remove("d-none");
});

btNovamente.addEventListener("click", () => {
  location.reload();
});
