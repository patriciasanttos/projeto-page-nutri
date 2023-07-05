var setaDireita = window.document.getElementById("seta-direita")
var Gestante = window.document.getElementById("card-gestante")
var Alimento = window.document.getElementById("card-alimento")
var Mente = window.document.getElementById("card-menteEsaude")
var Mulher = window.document.getElementById("card-mulher")
var setaEsquerda = window.document.getElementById("seta-esquerda")

function RolarParaDireita(){
    Gestante.style = "display:none"
    Mulher.style = "display:flex"
    setaDireita.style = "display:none"
    setaEsquerda.style = "display:flex"
}

function RolarParaEsquerda(){
    Mulher.style = "display:none"
    Gestante.style = "display:flex"
    setaEsquerda.style = "display:none"
    setaDireita.style = "display:flex"
}