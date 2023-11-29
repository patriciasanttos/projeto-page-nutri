let genero = null;
let idade = null;
let gestante = null;
let gestanteGemelar = null;

const styleBaixoPesoObesidade = "2px solid red";
const styleEutrofico = "2px solid green";
const styleSobrePeso = "2px solid orange";

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
  } else {
    toggleButtonById("feminino", true);
    toggleButtonById("masculino", false);
  }
}

function setIdade(faixaEtaria) {
  idade = faixaEtaria;
  if (idade == "adulto") {
    toggleButtonById("adulto", true);
    toggleButtonById("idoso", false);

    if (genero == "f") {
      document.getElementById("texto-gestante").style.display = "flex";
      document.getElementById("gestante").style.display = "flex";
    }
  } else {
    toggleButtonById("idoso", true);
    toggleButtonById("adulto", false);

    document.getElementById("texto-gestante").style.display = "none";
    document.getElementById("gestante").style.display = "none";
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

  let calculo1 = peso / altura / altura;
  let resultado = calculo1.toFixed(2);

  let pesoPreGest = document.getElementById("peso-pre-gest").value;
  let calculo2 = peso - pesoPreGest;
  let resultado2 = pesoPreGest / altura / altura;

  let baixoPesoGestMin = 12.5 - calculo2;
  let baixoPesoGestMax = 18 - calculo2;
  let eutrofPesoGestMin = 11.5 - calculo2;
  let eutrofPesoGestMax = 16 - calculo2;
  let sobrePesoGestMin = 7 - calculo2;
  let sobrePesoGestMax = 11.5 - calculo2;
  let obesPesoGestMin = 5 - calculo2;
  let obesPesoGestMax = 9 - calculo2;

  let eutrofPesoGemMin = 17 - calculo2;
  let eutrofPesoGemMax = 25 - calculo2;
  let sobrePesoGemMin = 14 - calculo2;
  let sobrePesoGemMax = 23 - calculo2;
  let obesPesoGemMin = 11 - calculo2;
  let obesPesoGemMax = 19 - calculo2;

  //IMC para Adultos
  function calculoAdulto() {
    if (
      genero == null ||
      idade == null ||
      peso == 0 ||
      altura == 0 ||
      altura < 1.45
    ) {
      alert("Por favor, verifique os dados preenchidos!");
    } else if (resultado < 18.5) {
      document.getElementById(
        "resultado"
      ).innerHTML = `O cálculo do seu IMC foi de: ${resultado}kg/m². O seu estado nutricional é: Desnutrido (a). Atenção! Vamos cuidar da alimentação?`;
      document.getElementById("resultado").style.border =
        styleBaixoPesoObesidade;
    } else if (resultado >= 18.5 && resultado < 25) {
      document.getElementById(
        "resultado"
      ).innerHTML = `O cálculo do seu IMC foi de: ${resultado}kg/m². O seu estado nutricional é: Eutrófico (a). Você está num bom caminho! Posso te ajudar a continuar cuidando da sua alimentação.`;
      document.getElementById("resultado").style.border = styleEutrofico;
    } else if (resultado >= 25 && resultado < 30) {
      document.getElementById(
        "resultado"
      ).innerHTML = `O cálculo do seu IMC foi de: ${resultado}kg/m². O seu estado nutricional é: Sobrepeso. Atenção! Posso te ajudar a fazer uma reeducação alimentar.`;
      document.getElementById("resultado").style.border = styleSobrePeso;
    } else if (resultado >= 30 && resultado < 35) {
      document.getElementById(
        "resultado"
      ).innerHTML = `O cálculo do seu IMC foi de: ${resultado}kg/m². O seu estado nutricional é: Obesidade grau I. Atenção! Posso te ajudar a fazer uma reeducação alimentar e melhorar alguns sintomas que surgem decorrente da obesidade.`;
      document.getElementById("resultado").style.border =
        styleBaixoPesoObesidade;
    } else if (resultado >= 35 && resultado < 40) {
      document.getElementById(
        "resultado"
      ).innerHTML = `O cálculo do seu IMC foi de: ${resultado}kg/m². O seu estado nutricional é: Obesidade grau II. Atenção! Posso te ajudar a fazer uma reeducação alimentar e melhorar alguns sintomas que surgem decorrente da obesidade.`;
      document.getElementById("resultado").style.border =
        styleBaixoPesoObesidade;
    } else if (resultado >= 40) {
      document.getElementById(
        "resultado"
      ).innerHTML = `O cálculo do seu IMC foi de: ${resultado}kg/m². O seu estado nutricional é: Obesidade grau III. Atenção! Posso te ajudar a fazer uma reeducação alimentar e melhorar alguns sintomas que surgem decorrente da obesidade.`;
      document.getElementById("resultado").style.border =
        styleBaixoPesoObesidade;
    }
  }

  //IMC para Idosos
  function calculoIdoso() {
    if (
      genero == null ||
      idade == null ||
      peso == 0 ||
      altura == 0 ||
      altura < 1.45
    ) {
      alert("Por favor, verifique os dados preenchidos!");
    } else if (resultado < 23) {
      document.getElementById("resultado").innerHTML =
        "O seu estado nutricional deu: Desnutrido (a). Atenção! É preciso cuidar da alimentação.";
      document.getElementById("resultado").style.border =
        styleBaixoPesoObesidade;
    } else if (resultado >= 23 && resultado < 28) {
      document.getElementById("resultado").innerHTML =
        "O seu estado nutricional deu: Eutrófico (a). Você está num bom caminho! Continue cuidando da sua alimentação.";
      document.getElementById("resultado").style.border = styleEutrofico;
    } else if (resultado >= 28 && resultado < 30) {
      document.getElementById("resultado").innerHTML =
        "O seu estado nutricional deu: Sobrepeso. Atenção! Você pode fazer uma reeducação alimentar.";
      document.getElementById("resultado").style.border = styleSobrePeso;
    } else if (resultado >= 30) {
      document.getElementById("resultado").innerHTML =
        "O seu estado nutricional deu: Obesidade. Atenção! Você pode fazer uma reeducação alimentar.";
      document.getElementById("resultado").style.border =
        styleBaixoPesoObesidade;
    }
  }

  //IMC para Gestantes
  function calculoGestante() {
    if (
      genero == "f" &&
      idade == "adulto" &&
      gestante == null &&
      gestanteGemelar == null
    ) {
      alert("Por favor, verifique os dados preenchidos!");
    } else if (resultado2 < 18.5) {
      document.getElementById(
        "resultado"
      ).innerHTML = `Seu peso pré-gestacional teve um IMC de baixo peso, você pode ganhar 
        entre ${baixoPesoGestMin}kg à ${baixoPesoGestMax}kg. Para informações mais detalhadas, podemos agendar uma consulta e esclarecer as dúvidas.`;
      document.getElementById("resultado").style.border =
        styleBaixoPesoObesidade;
    } else if (resultado2 >= 18.5 && resultado2 < 25) {
      document.getElementById(
        "resultado"
      ).innerHTML = `Seu peso pré-gestacional teve um IMC eutrófico, você pode ganhar 
        entre ${eutrofPesoGestMin}kg à ${eutrofPesoGestMax}kg. Para informações mais detalhadas, podemos agendar uma consulta e esclarecer as dúvidas.`;
      document.getElementById("resultado").style.border = styleEutrofico;
    } else if (resultado2 >= 25 && resultado2 < 30) {
      document.getElementById(
        "resultado"
      ).innerHTML = `Seu peso pré-gestacional teve um IMC de sobrepeso, você pode ganhar 
        entre ${sobrePesoGestMin}kg à ${sobrePesoGestMax}kg. Para informações mais detalhadas, podemos agendar uma consulta e esclarecer as dúvidas.`;
      document.getElementById("resultado").style.border = styleSobrePeso;
    } else if (resultado2 >= 30) {
      document.getElementById(
        "resultado"
      ).innerHTML = `Seu peso pré-gestacional teve um IMC de obesidade, você pode ganhar 
        entre ${obesPesoGestMin}kg à ${obesPesoGestMax}kg. Para informações mais detalhadas, podemos agendar uma consulta e esclarecer as dúvidas.`;
      document.getElementById("resultado").style.border =
        styleBaixoPesoObesidade;
    }
  }

  //IMC para Gestação gemelar
  function calculoGestanteGemeos() {
    if (resultado2 >= 18.5 && resultado2 < 25) {
      document.getElementById(
        "resultado"
      ).innerHTML = `Seu peso pré-gestacional teve um IMC eutrófico, você pode ganhar 
        entre ${eutrofPesoGemMin}kg à ${eutrofPesoGemMax}kg. Para informações mais detalhadas, podemos agendar uma consulta e esclarecer as dúvidas.`;
      document.getElementById("resultado").style.border = styleEutrofico;
    } else if (resultado2 >= 25 && resultado2 < 30) {
      document.getElementById(
        "resultado"
      ).innerHTML = `Seu peso pré-gestacional teve um IMC de spbrepeso, você pode ganhar 
        entre ${sobrePesoGemMin}kg à ${sobrePesoGemMax}kg. Para informações mais detalhadas, podemos agendar uma consulta e esclarecer as dúvidas`;
      document.getElementById("resultado").style.border = styleSobrePeso;
    } else if (resultado2 >= 30) {
      document.getElementById(
        "resultado"
      ).innerHTML = `Seu peso pré-gestacional teve um IMC de obesidade, você pode ganhar 
        entre ${obesPesoGemMin}kg à ${obesPesoGemMax}kg. Para informações mais detalhadas, podemos agendar uma consulta e esclarecer as dúvidas`;
      document.getElementById("resultado").style.border =
        styleBaixoPesoObesidade;
    }
  }

  if (
    pesoPreGest == 0 || gestanteGemelar == null
  ) {
    alert("Por favor, verifique os dados preenchidos!");
  } else if (idade == "adulto") {
    if (genero == "f" && gestante) {
      if (!gestanteGemelar) {
        calculoGestante();
      } else {
        calculoGestanteGemeos();
      }
    } else {
      calculoAdulto();
    }
  } else {
    calculoIdoso();
  }
}

document.getElementById("buttonResponder").addEventListener("click", responder);
