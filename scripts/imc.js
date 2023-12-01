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

function toggleGestante(show) {
  document.getElementById("texto-gestante").style.display = show
    ? "flex"
    : "none";
  document.getElementById("gestante").style.display = show ? "flex" : "none";

  if (!show) {
    document.getElementById("texto-gemelar").style.display = "none";
    document.getElementById("gestante-gemelar").style.display = "none";
    document.getElementById("peso-pre").style.display = "none";
  }
}

//declarando/criando a função e recebendo um valor
function setGenero(sexo) {
  genero = sexo;
  if (genero == "m") {
    toggleButtonById("masculino", true);
    toggleButtonById("feminino", false);
    toggleGestante(false);
  } else {
    toggleButtonById("feminino", true);
    toggleButtonById("masculino", false);
    toggleGestante(true);
  }
}

function setIdade(faixaEtaria) {
  idade = faixaEtaria;
  if (idade == "adulto") {
    toggleButtonById("adulto", true);
    toggleButtonById("idoso", false);

    if (genero == "f") {
      toggleGestante(true);
    }
  } else {
    toggleButtonById("idoso", true);
    toggleButtonById("adulto", false);
    toggleGestante(false);
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
  let calculoPre = peso - pesoPreGest;
  let calculo2 = pesoPreGest / altura / altura;
  let resultado2 = calculo2.toFixed(2);

  let baixoPesoGestMin = 12.5 - calculoPre;
  let baixoPesoGestMax = 18 - calculoPre;
  let eutrofPesoGestMin = 11.5 - calculoPre;
  let eutrofPesoGestMax = 16 - calculoPre;
  let sobrePesoGestMin = 7 - calculoPre;
  let sobrePesoGestMax = 11.5 - calculoPre;
  let obesPesoGestMin = 5 - calculoPre;
  let obesPesoGestMax = 9 - calculoPre;

  let eutrofPesoGemMin = 17 - calculoPre;
  let eutrofPesoGemMax = 25 - calculoPre;
  let sobrePesoGemMin = 14 - calculoPre;
  let sobrePesoGemMax = 23 - calculoPre;
  let obesPesoGemMin = 11 - calculoPre;
  let obesPesoGemMax = 19 - calculoPre;

  function validarCamposVazios() {
    return (
      genero == null ||
      idade == null ||
      peso == 0 ||
      altura == 0 ||
      altura < 1.45 || altura >= 2.20
    
    );
  }

  //IMC para Adultos
  function calculoAdulto() {
    if (validarCamposVazios()) {
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
    if (validarCamposVazios()) {
      alert("Por favor, verifique os dados preenchidos!");
    } else if (resultado < 23) {
      document.getElementById(
        "resultado"
      ).innerHTML = `O cálculo do seu IMC foi de: ${resultado}kg/m². O seu estado nutricional é: Desnutrido (a). Atenção! É preciso cuidar da alimentação.`;
      document.getElementById("resultado").style.border =
        styleBaixoPesoObesidade;
    } else if (resultado >= 23 && resultado < 28) {
      document.getElementById(
        "resultado"
      ).innerHTML = `O cálculo do seu IMC foi de: ${resultado}kg/m². O seu estado nutricional é: Eutrófico (a). Você está num bom caminho! Continue cuidando da sua alimentação.`;
      document.getElementById("resultado").style.border = styleEutrofico;
    } else if (resultado >= 28 && resultado < 30) {
      document.getElementById(
        "resultado"
      ).innerHTML = `O cálculo do seu IMC foi de: ${resultado}kg/m². O seu estado nutricional é: Sobrepeso. Atenção! Você pode fazer uma reeducação alimentar.`;
      document.getElementById("resultado").style.border = styleSobrePeso;
    } else if (resultado >= 30) {
      document.getElementById(
        "resultado"
      ).innerHTML = `O cálculo do seu IMC foi de: ${resultado}kg/m². O seu estado nutricional é: Obesidade. Atenção! Você pode fazer uma reeducação alimentar.`;
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
      ).innerHTML = `O cálculo do seu IMC pré-gestacional foi de: ${resultado2}kg/m². Seu estado nutricional pré-gestacional foi: Desnutrido. Você pode ganhar 
        entre ${baixoPesoGestMin}kg à ${baixoPesoGestMax}kg. Para informações mais detalhadas, podemos agendar uma consulta e esclarecer as dúvidas.`;
      document.getElementById("resultado").style.border =
        styleBaixoPesoObesidade;
    } else if (resultado2 >= 18.5 && resultado2 < 25) {
      document.getElementById(
        "resultado"
      ).innerHTML = `O cálculo do seu IMC pré-gestacional foi de: ${resultado2}kg/m². Seu estado nutricional pré-gestacional foi: Eutrófico. Você pode ganhar 
        entre ${eutrofPesoGestMin}kg à ${eutrofPesoGestMax}kg. Para informações mais detalhadas, podemos agendar uma consulta e esclarecer as dúvidas.`;
      document.getElementById("resultado").style.border = styleEutrofico;
    } else if (resultado2 >= 25 && resultado2 < 30) {
      document.getElementById(
        "resultado"
      ).innerHTML = `O cálculo do seu IMC pré-gestacional foi de: ${resultado2}kg/m². Seu estado nutricional pré-gestacional foi: Sobrepeso. Você pode ganhar 
        entre ${sobrePesoGestMin}kg à ${sobrePesoGestMax}kg. Para informações mais detalhadas, podemos agendar uma consulta e esclarecer as dúvidas.`;
      document.getElementById("resultado").style.border = styleSobrePeso;
    } else if (resultado2 >= 30) {
      document.getElementById(
        "resultado"
      ).innerHTML = `O cálculo do seu IMC pré-gestacional foi de: ${resultado2}kg/m². Seu estado nutricional pré-gestacional foi: Obesidade. Você pode ganhar 
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
      ).innerHTML = `O cálculo do seu IMC pré-gestacional foi de: ${resultado2}kg/m². Seu estado nutricional pré-gestacional foi: Eutrófico. Você pode ganhar 
        entre ${eutrofPesoGemMin}kg à ${eutrofPesoGemMax}kg. Para informações mais detalhadas, podemos agendar uma consulta e esclarecer as dúvidas.`;
      document.getElementById("resultado").style.border = styleEutrofico;
    } else if (resultado2 >= 25 && resultado2 < 30) {
      document.getElementById(
        "resultado"
      ).innerHTML = `O cálculo do seu IMC pré-gestacional foi de: ${resultado2}kg/m². Seu estado nutricional pré-gestacional foi: Sobrepeso. Você pode ganhar 
        entre ${sobrePesoGemMin}kg à ${sobrePesoGemMax}kg. Para informações mais detalhadas, podemos agendar uma consulta e esclarecer as dúvidas`;
      document.getElementById("resultado").style.border = styleSobrePeso;
    } else if (resultado2 >= 30) {
      document.getElementById(
        "resultado"
      ).innerHTML = `O cálculo do seu IMC pré-gestacional foi de: ${resultado2}kg/m². Seu estado nutricional pré-gestacional foi: Obesidade. Você pode ganhar 
        entre ${obesPesoGemMin}kg à ${obesPesoGemMax}kg. Para informações mais detalhadas, podemos agendar uma consulta e esclarecer as dúvidas`;
      document.getElementById("resultado").style.border =
        styleBaixoPesoObesidade;
    }
  }

  if (idade == "adulto") {
    if (genero == "f") {
      if (gestante) {
        if (pesoPreGest == 0 || gestanteGemelar == null) {
          alert("Por favor, verifique os dados preenchidos!");
        } else if (gestante) {
          if (!gestanteGemelar) {
            calculoGestante();
          } else {
            calculoGestanteGemeos();
          }
        }
      } else {
        calculoAdulto();
      }
    } else {
      calculoAdulto();
    }
  } else {
    calculoIdoso();
  }
}

document.getElementById("buttonResponder").addEventListener("click", responder);

// Mask inputs
IMask(document.getElementById('peso'), { mask: '00.00'});
IMask(document.getElementById('peso-pre-gest'), { mask: '00.00' });
IMask(document.getElementById('altura'), { mask: '0.00' });


