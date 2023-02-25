let jogoAutomatico = true;
let jogarNovamente = true;
let tentativas = 6;
let listaDinamica = [];
let palavraSecretaCategoria;
let palavraSecretaSorteada;
let palavras = [];

carregaListaAutomatica();

criarPalavraSecreta();
function criarPalavraSecreta(){
    const indexPalavra= parseInt(Math.random()*palavras.length)
    
    palavraSecretaSorteada = palavras[indexPalavra].nome;
    palavraSecretaCategoria = palavras[indexPalavra].categoria;
    console.log(palavraSecretaCategoria)
    console.log(palavraSecretaSorteada)
}

montarPalavraNaTela();
function montarPalavraNaTela(){
    const categoria  = document.getElementById("categoria");
    categoria.innerHTML = palavraSecretaCategoria;

    const palavraTela  = document.getElementById("palavra-secreta");
    palavraTela.innerHTML = "";

    for(i = 0; i < palavraSecretaSorteada.length; i ++){
        if( listaDinamica[i] == undefined){
            if(palavraSecretaSorteada[i] == " "){
                listaDinamica[i] = " "
                palavraTela.innerHTML = palavraTela.innerHTML + "<div class ='letrasEspaco'>"+listaDinamica[i] +"</div>"
            }
            else{
                listaDinamica[i] = "&nbsp;"
                palavraTela.innerHTML = palavraTela.innerHTML + "<div class ='letras'>"+listaDinamica[i] +"</div>"
            }
        }
        else{
            if(palavraSecretaSorteada[i] == " "){
                listaDinamica[i] = " "
                palavraTela.innerHTML = palavraTela.innerHTML + "<div class ='letrasEspaco'>"+listaDinamica[i] +"</div>"
            }
            else{
                palavraTela.innerHTML = palavraTela.innerHTML + "<div class ='letras'>"+listaDinamica[i] +"</div>"
            }
        }
    }
    console.log(listaDinamica)
}

function verificaLetraEsolhida(letra){
    document.getElementById("tecla-"+ letra).disabled = true;
    if(tentativas > 0 )
    {
        mudarStyleLetra("tecla-" + letra,false);
        comparalistas(letra);
        montarPalavraNaTela();

    }
}


function mudarStyleLetra(tecla,condicao){
    if(condicao == false)
    {
    document.getElementById(tecla).style.background = "#C71585";
    document.getElementById(tecla).style.color = "#ffffff";
    }
    else{
        document.getElementById(tecla).style.background = "#008000";
        document.getElementById(tecla).style.color = "#ffffff";
    }
    
}
async function comparalistas(letra){
    const pos = palavraSecretaSorteada.indexOf(letra)
    if( pos < 0 ){
        tentativas -- 
        carregaImagemForca()
      
        if(tentativas == 0 )
        {
            openModal("OPS!", "Não foi dessa vez... A palavra secreta era <br>" + palavraSecretaSorteada);
            piscarBotaoJogarNovamente(true);
        }
    }
    else{
        mudarStyleLetra("tecla-"+ letra,true);
        for(i = 0; i < palavraSecretaSorteada.length; i ++)
        {
            if(palavraSecretaSorteada[i] == letra){
                listaDinamica[i] = letra;
            }
        }
    }
    let vitoria = true;
    for( i = 0; i < palavraSecretaSorteada.length; i ++){
        if(palavraSecretaSorteada[i] != listaDinamica[i]){
            vitoria = false; 
        }
    }
    if(vitoria == true)
    {
        openModal("PARABÉNS", "VOCÊ ADIVINHOU A PALAVRA SECRETA... <br><br> Clique no botão com a mãozinha indicativa para jogar novamente. ");
        tentativas = 0; 
        piscarBotaoJogarNovamente(true);
    }
}
 
function carregaImagemForca(){
    switch(tentativas){
        case 5:
            document.getElementById("imagem").style.background = "url('./IMG/forca01.png')";
            break;
        case 4:
            document.getElementById("imagem").style.background = "url('./IMG/forca02.png')";
            break;
        case 3:
            document.getElementById("imagem").style.background = "url('./IMG/forca03.png')";
            break;
        case 2:
            document.getElementById("imagem").style.background = "url('./IMG/forca04.png')";
            break;
        case 1:
            document.getElementById("imagem").style.background = "url('./IMG/forca05.png')";
            break;
        case 0:
            document.getElementById("imagem").style.background = "url('./IMG/forca06.png')";
            break;
        default:
                document.getElementById("imagem").style.background = "url('./IMG/forca.png')";
                break;
    }
}

function openModal(titulo, mensagem){
    let modalTitulo = document.getElementById("exampleModalLabel");
    modalTitulo.innerText = titulo;
   
    let modalBody = document.getElementById("modalBody");
   modalBody.innerHTML = mensagem;

    let modal = new bootstrap.Modal(document.getElementById('myModal'))
    modal.show();
}

let btnReiniciar = document.querySelector("#btnreiniciar")
btnReiniciar.addEventListener("click",function(){
    openModal("Obrigado por jogar"," Fique atento as novidades no meu portifólio");
});

function listaAutomatica(){ //Ativa o modo manual 
    if(jogoAutomatico == true){
       document.getElementById("jogarAutomatico").innerHTML = "<i class='bx bx-play-circle'></i>"
       palavras = [];
        jogoAutomatico = false;  

        document.getElementById("abreModalAddPalavra").style.display = "block";
        document.getElementById("status").innerHTML = "Modo Manual";
        
        document.getElementById("categoria").innerHTML = " ";
        document.getElementById("palavra-secreta").innerHTML = " ";

        palavraSecretaCategoria = "";
        palavraSecretaSorteada = " "  
        
    }
    else if(jogoAutomatico == false){ //Ativa o modo automatico.
        location.reload();
    }

}


const btnAbreModal = document.getElementById("abreModalAddPalavra")
btnAbreModal.onclick = function(){
    const modal = document.getElementById("modal-alerta")
    modal.style.display = "block"
}

const btnFechaModal = document.getElementById("fechaModal")
btnFechaModal.onclick = function(){
    const modal = document.getElementById("modal-alerta")
    modal.style.display = "none"
    document.getElementById("addPalavra").value = "" ; 
    document.getElementById("addCategoria").value = "" ; 
}

// window.onclick = function(){ 
//     if (event.target == modal) {
//         modal.style.display = "none";
//         document.getElementById("addPalavra").value = "";
//         document.getElementById("addCategoria").value = ""; 
//     }  
// }

function carregaListaAutomatica(){
     palavras = [
        palavra001 = {
            nome: "IRLANDA",
            categoria: "LUGARES"
        },
        palavra002 = {
            nome: "EQUADOR",
            categoria:"LUGARES"
        },
        palavra003 = {
            nome: "ESTADOS UNIDOS",
            categoria: "LUGARES"
        },
        palavra004 = {
            nome: "JAPAO",
            categoria: "LUGARES"
        },
        palavra005 = {
            nome: "ALEMANHA",
            categoria: "LUGARES"
        },
        palavra006 = {
            nome: "REINO UNIDO",
            categoria: "LUGARES"
        },
        palavra007 = {
            nome: "FRANÇA",
            categoria: "LUGARES"
        },
        palavra008 = {
            nome: "BRASIL",
            categoria: "LUGARES"
        },
        palavra009 = {
            nome: "CHINA",
            categoria: "LUGARES"
        },
        palavra010 = {
            nome: "INDIA",
            categoria: "LUGARES"
        },
        palavra011 = {
            nome: "CARRO",
            categoria: "TRANSPORTES"
        },
        palavra012 = {
            nome: "ONIBUS",
            categoria: "TRANSPORTES"
        },
        palavra013 = {
            nome: "TREM",
            categoria:"TRANSPORTES"
        },
        palavra014 = {
            nome: "AVIAO",
            categoria: "TRANSPORTES"
        },
        palavra015 = {
            nome: "BICICLETA",
            categoria: "TRANSPORTES"
        },
        palavra016 = {
            nome: "MOTOCICLETA",
            categoria: "TRANSPORTES"
        },
        palavra017 = {
            nome: "PATINS",
            categoria: "TRANSPORTES"
        },
        palavra018 = {
            nome: "SKATEBOARD",
            categoria: "TRANSPORTES"
        },
        palavra019 = {
            nome: "JET SKI",
            categoria: "TRANSPORTES"
        },
        palavra019 = {
            nome: "BARCO",
            categoria: "TRANSPORTES"
        },
        palavra020 = {
            nome: "BALSA",
            categoria: "TRANSPORTES"
        },
        palavra021 = {
            nome: "CACHORRO",
            categoria: "ANIMAIS"
        },
        palavra022 = {
            nome: "GATO",
            categoria: "ANIMAIS"
        },
        palavra023 = {
            nome: "LEAO",
            categoria: "ANIMAIS"
        },
        palavra024 = {
            nome: "MACACO",
            categoria: "ANIMAIS"
        },
        palavra025 = {
            nome: "ELEFANTE",
            categoria: "ANIMAIS"
        },
        palavra026 = {
            nome: "PAVAO",
            categoria: "ANIMAIS"
        },
        palavra027 = {
            nome: "BUFALO",
            categoria: "ANIMAIS"
        },
        palavra028 = {
            nome: "TIGRE",
            categoria: "ANIMAIS"
        },
        palavra029 = {
            nome: "LHAMA",
            categoria: "ANIMAIS"
        },
        palavra030 = {
            nome: "GALINHA",
            categoria:"ANIMAIS"
        },
        palavra031 = {
            nome: "A ERA DO GELO",
            categoria:"TV E CINEMA"
        },
        palavra032 = {
            nome: "A CASA MONSTRO",
            categoria:"TV E CINEMA"
        },
        palavra033 = {
            nome: "STRANGER THINGS",
            categoria:"TV E CINEMA"
        },
        palavra034 = {
            nome: "MULHER MARAVILHA",
            categoria:"TV E CINEMA"
        },
        palavra035 = {
            nome: "O INCRIVEL HULK",
            categoria:"TV E CINEMA"
        },
        palavra036 = {
            nome: "BOB ESPONJA",
            categoria:"TV E CINEMA"
        },
        palavra037 = {
            nome: "HOMEM ARANHA",
            categoria:"TV E CINEMA"
        }
    ];
    
}

function adicionarPalavra(){
    let addPalavra = document.getElementById("addPalavra").value.toUpperCase();
    let addCategoria = document.getElementById("addCategoria").value.toUpperCase();

     if(isNullOrWhiteSpace(addPalavra) || isNullOrWhiteSpace(addCategoria) || 
     addPalavra.length < 3 || 
     addCategoria < 3 ){
       openModal("ATENÇÃO","Palavra e/ou categoria inválidos")
          return;
      }
   
   
    let palavra = { 
            nome: addPalavra,
            categoria:addCategoria
        }
        palavras.push(palavra);
        sortear(); 
        document.getElementById("addPalavra").value = "";
        document.getElementById("addCategoria").value = "";;
    }

    function isNullOrWhiteSpace(input){
        return !input || !input.trim();
    }

    function sortear(){
        if(jogoAutomatico == true){
            location.reload();
        }
        else{
            if(palavras.length > 0){
                listaDinamica= [];
                criarPalavraSecreta();
                montarPalavraNaTela();
                resetaTeclas();
                tentativas = 6;
                piscarBotaoJogarNovamente(false);
            }
        }
    }


function resetaTeclas(){
    let teclas = document.querySelectorAll(".teclas > button")
    teclas.forEach((x) =>{
        x.style.background = "#ffffff";
        x.style.color = "#8b008b";
        x.disabled = false;
    });
}

async function piscarBotaoJogarNovamente(querJogar){  
    if(querJogar == true){
       document.getElementById("jogarNovamente").style.display = "block" 
    }
    else{
        document.getElementById("jogarNovamente").style.display = "none" 
    }
}   