var biblioteca=["aguia"   ,"burro"   ,"camelo"  ,"dromedalio" ,"elefante" ,"vaca"       ,"boi"      ,"macaco"     ,"sapo"       ,"cachorro"  ,
"brasil"  ,"japão"   , "mexico" ,"holanda"    ,"africa"   , "portugal"  ,"croacia"  ,"argentina"  ,"india"      ,"australia" ,
"maça"    ,"banana"  ,"pera"    ,"uva"        ,"mamao"    ,"ameixa"     , "limao"   ,"cereja"     ,"cereja"     ,"abacaixi"  ,
"carro"   ,"aviao"   ,"onibus"  ,"van"        ,"moto"     ,"trem"       ,"barco"    ,"caminhao"   ,"submarino"  ,"foguete"   ];

var qtd = biblioteca.length-1;
var pos = Math.round(Math.random()*qtd);
var palavra = biblioteca[pos];
var cxLetras = [];
var acertos;
var errosMax = 5;
var erros = 0;
var acertou = false;
var jogando = false;
var jog;
var tam;
var escolha = 2;
var img;
var forca;

function carregarImg(){
     img = new Image();
     img.src = "./img/into.gif";
     forca = document.querySelector('#dvforca');
     forca.style.backgroundImage = "url('"+img.src+"')";
}

function defineLetras(t){
     var letras = document.querySelectorAll(".letra");
     letras.forEach(function (posicao){
       posicao.value = "";
       posicao.style.display = "none";
     })

     for (var i = 0; i < t ; i++) {
          letras[i].style.display = "inline-block"
     }
}

function jogar(){
     jog = document.querySelector('#letraJ');
     jog.focus();
     if(jog.value == "" && jogando){
          alert("Digite uma Letra");
     }else{
          if(jogando){
               var obj = document.querySelectorAll(".letra");
               var letratmp;
               var letra;
               var pesq;
               letra = jog.value;
               jog.value = "";
               pesq = palavra.match(letra);
               acertou = false;
               while(pesq!=null){
                    letratmp = palavra.search(letra);
                    obj[letratmp].value = letra;
                    palavra = palavra.replace(letra,0);
                    acertos++;
                    pesq = palavra.match(letra);
                    acertou = true}
               }
               if (!acertou){
                    document.querySelector('#dvletrasdigitadas').innerHTML += letra.toUpperCase();
                    erros++
                    if(erros <= 7){
                         img.src = "img/corpo"+erros+".gif";
                         forca.style.backgroundImage = "url('"+img.src+"')";
                    }else{
                         img.src = "img/fim.gif";
                         forca.style.backgroundImage = "url('"+img.src+"')";
                         setTimeout(function(){
                              img.src = "img/gameover.gif";
                              forca.style.backgroundImage = "url('"+img.src+"')";
                              document.querySelector('#dvmsg').innerHTML = "PERDEU!"
                              jogando = false;
                         },2500);
                    }
               }
               if (acertos==tam){
                    img.src = "img/win.gif";
                    forca.style.backgroundImage = "url('"+img.src+"')";
                    document.querySelector("#dvmsg").innerHTML = "GANHOU!"
                    jogando = false;
               }
          }
     }


     function inicia(){
          img.src = "./img/corpo.gif";
          forca.style.backgroundImage="url('"+img.src+"')";
          jogando = true;
          jog = document.querySelector("#letraJ");
          jog.value = "";
          jog.focus();
          acertos = 0;
          erros = 0
          acertou = false;
          document.querySelector("#dvmsg").innerHTML="";
          if (escolha == 1){
               pos = Math.round(Math.random()*qtd);
               palavra = biblioteca[pos];
          }else if (escolha == 2) {
               palavra = prompt("Desafiante entre com a palavra com até 20 caracteres:")
          }
          tam = palavra.length;
          defineLetras(tam);
     }

     function vsCOM(){
          document.querySelector('#btchoice1').innerHTML = 'Nova Palavra';
          document.querySelector('#btchoice2').style.display = 'none';
          document.querySelector('#controlesJogador').style.display = 'inline-block';
          document.querySelector('#dvletrasdigitadas').innerHTML="Letras Digitadas: ";
          escolha = 1;
          inicia()
     }

     function vsPLAYER(){
          document.querySelector('#btchoice2').innerHTML = 'Novo Desafio';
          document.querySelector('#btchoice1').style.display = 'none';
          document.querySelector('#controlesJogador').style.display = 'inline-block';
          document.querySelector('#dvletrasdigitadas').innerHTML="Letras Digitadas: " ;
          escolha = 2;
          inicia()
     }

     function dica(){
       if(escolha == 1){
          if(pos<10){
               alert("ANIMAIS");
          }else if(pos>=10 && pos<20){
               alert("PAISES");
          }else if(pos>=20 && pos<30){
               alert("FRUTAS");
          }else if(pos>=30 && pos<40){
               alert("VEICULOS");
          }}else{}
     }

     window.addEventListener('load', carregarImg);
