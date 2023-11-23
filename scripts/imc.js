let genero = null;
let idade = null;
let gestante = null;
let gestanteGemelar = null;

function toggleButtonById(id, isOn) {
  // Pega o elemento pelo id (botao que a gente quer)
  // Ve se ele está selecionado
  // Se tiver selecionado, tira a classe
  // se nao tiver selecionado, bota a classe

  let botao = document.getElementById(id);
  let classes = botao.getAttribute("class");

  if (!isOn) {
    botao.setAttribute("class", classes.replace("selecionado", ""));
  } else {
    if (classes.indexOf("selecionado") == -1) {
      botao.setAttribute("class", `${classes} selecionado`);
    }
  }
}

//declarando/criando a função e recebendo um valor
function setGenero(sexo) {
  genero = sexo;
  if (genero == "m") {
    toggleButtonById("masculino", true);
    toggleButtonById("feminino", false);

    document.getElementById("texto-gestante").style.display = "none";
    document.getElementById("gestante").style.display = "none";
    document.getElementById("peso-pre").style.display = "none";
  } else {
    toggleButtonById("feminino", true);
    toggleButtonById("masculino", false);

    document.getElementById("texto-gestante").style.display = "flex";
    document.getElementById("gestante").style.display = "flex";
  }
}

function setIdade(faixaEtaria) {
  idade = faixaEtaria;
  if (idade == "adulto") {
    toggleButtonById("adulto", true);
    toggleButtonById("idoso", false);
  } else {
    toggleButtonById("idoso", true);
    toggleButtonById("adulto", false);
  }
}

function setGestante(isGestante) {
  gestante = isGestante;
  if (isGestante) {
    toggleButtonById("gestante-ok", true);
    toggleButtonById("nao-gestante", false);

    document.getElementById("texto-gemelar").style.display = "flex";
    document.getElementById("gestante-gemelar").style.display = "flex";
    document.getElementById("peso-pre").style.display = "flex";
  } else {
    toggleButtonById("nao-gestante", true);
    toggleButtonById("gestante-ok", false);

    document.getElementById("texto-gemelar").style.display = "none";
    document.getElementById("gestante-gemelar").style.display = "none";
    document.getElementById("peso-pre").style.display = "none";
  }
}

function setGestanteGemelar(isGemelar) {
  gestanteGemelar = isGemelar;
  if (isGemelar) {
    toggleButtonById("gemeos", true);
    toggleButtonById("nao-gemeos", false);
  } else {
    toggleButtonById("nao-gemeos", true);
    toggleButtonById("gemeos", false);
  }
}

//criando evento de clique e passando um valor para a função
document
  .getElementById("masculino")
  .addEventListener("click", () => setGenero("m"));
document
  .getElementById("feminino")
  .addEventListener("click", () => setGenero("f"));
document
  .getElementById("adulto")
  .addEventListener("click", () => setIdade("adulto"));
document
  .getElementById("idoso")
  .addEventListener("click", () => setIdade("idoso"));
document
  .getElementById("gestante-ok")
  .addEventListener("click", () => setGestante(true));
document
  .getElementById("nao-gestante")
  .addEventListener("click", () => setGestante(false));
document
  .getElementById("gemeos")
  .addEventListener("click", () => setGestanteGemelar(true));
document
  .getElementById("nao-gemeos")
  .addEventListener("click", () => setGestanteGemelar(false));

function responder() {
  let peso = document.getElementById("peso").value;
  let altura = document.getElementById("altura").value;
  let calculo = peso / altura / altura;
  let resultado = calculo.toFixed(2);

  if (
    genero == null ||
    idade == null ||
    peso == 0 ||
    altura == 0 ||
    altura < 1.45
  ) {
    alert("Por favor, preencha os dados!");
  } else if (idade == "adulto") {
    if (resultado < 18.5) {
      console.log("Seu IMC adulto é de baixo peso");
    } else if (resultado >= 18.5 && resultado < 25) {
      console.log("Seu imc adulto é eutrófico");
    } else if (resultado >= 25 && resultado < 30) {
      console.log("Seu imc adulto é sobrepeso / pré-obesidade");
    } else if (resultado >= 30 && resultado < 35) {
      console.log("Seu imc adulto obesidade grau I");
    }
  }

  if (idade == "idoso") {
    if (resultado < 23) {
      console.log("Seu imc idoso é baixo peso");
    } else if (resultado >= 23 && resultado < 28) {
      console.log("Seu imc idoso é eutrófico");
    } else if (resultado >= 28 && resultado < 30) {
      console.log("Seu imc idoso é sobrepeso");
    } else if (resultado >= 30) {
      console.log("Seu imc idoso é obesidade");
    }
  }
  console.log(resultado);
}

document.getElementById("buttonResponder").addEventListener("click", responder);
