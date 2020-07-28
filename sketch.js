var tela = 1;
var largura = 200;
var altura = 50;
var xmenu = 200;
//tela de inicio,
var ymenu1 = 380;
var ymenu2 = 480;
//tela de opções.
var ymenu3 = 520;
//opção de pausa
var xmenu1 = 250;
var ymenu4 = 10;
//Variaveis da tela de pausa.
var xmenu2 = 50;
var xmenu3 = 350;
var ymenu5 = 520;
//variaveis do disparo.
var xd = 0;
var yd = 0;
var raiodisparo = 5;
var estadodisparo = false;
var colisao = false;
//Informações da tela de jogo.
var vidas = 3;
var tabuada = 1;
var cont = 1;
//Variavel do obstaculo.
var xo = [];
var yo = [];
var velocidade = 1;
var raioobs = 60;
var qtobs = 4;
var respostas = [1, 2, 3, 4];
//Subir nivel.
var pontos = 90;
var barreiradepontos = 10;
//imagens.
var fundo;
var img1;
var img2;
var gameover;
var pausa;
var conclusao;

//Funções.
function preload() {
    fundo = loadImage('tabuada2.png');
    img1 = loadImage('foto eu.jpg');
    img2 = loadImage('foto edit.jpg');
    gameover = loadImage('Game over.jpg');
    pausa = loadImage('pausa.jpg');
    conclusao = loadImage('conclusao.png');
}

function setup() {
    createCanvas(600, 600);
    for (i = 0; i < qtobs; i++) {
        xo[i] = (random(50, 550), (i * 100, (i + 1) * 100));
        yo[i] = (0);
    }
}

function randomize() {
    return Math.floor(Math.random() * 100) + 1;
}

function draw() {

    //Tela de menu.
    if (tela == 1) {
        background(fundo);

        //Iniciar.
        textAlign(CENTER);
        textSize(30);

        stroke(200);
        fill(15);
        rect(xmenu, ymenu1, largura, altura, 30);

        //Mudar cor ao selecionar.
        if (mouseX > xmenu && mouseX < xmenu + largura && mouseY > ymenu1 && mouseY < ymenu1 + altura) {

            stroke(200);
            fill(0, 0, 200);
            rect(xmenu, ymenu1, largura, altura, 30);
            if (mouseIsPressed) {
                tela = 2;
            }
        }

        fill(200);
        noStroke();
        text("Jogar", 300, 415);

        vidas = 3;
        tabuada = 1;
        pontos = 1;


        //Opções.
        stroke(200);
        fill(15);
        rect(xmenu, ymenu2, largura, altura, 30);

        //Mudar cor ao selecionar.
        if (mouseX > xmenu && mouseX < xmenu + largura && mouseY > ymenu2 && mouseY < ymenu2 + altura) {

            stroke(200);
            fill(0, 0, 200);
            rect(xmenu, ymenu2, largura, altura, 30);
            if (mouseIsPressed) {
                tela = 3;
            }
        }

        fill(200);
        noStroke();
        text("Opções", 300, 515);

    }

    //tela de jogo.
    if (tela == 2) //tela de jogo.
    {
        background(40);
        //Jogador.
        noStroke();
        fill(200, 0, 0);
        ellipse(mouseX, 540, 30, 30);
        if (mouseX > 600) {
            mouseX = 600;
        }
        if (mouseX < 0) {
            mouseX = 0;
        }

        //tratava antes disparo aqui, coloquei depois do for

        //placar.
        stroke("F");
        fill(40);
        rect(0, 70, 600, -70);

        //Informações do placar.
        textSize(30);
        fill(200);
        noStroke();
        text("Vidas: " + vidas, 100, altura);
        textSize(30);
        fill(200);
        noStroke();
        text("Nivel: " + tabuada + " x " + cont, 500, altura);
        textSize(20);
        fill(150);
        noStroke();
        text("pontos: " + pontos, 515, 580);

        //pausa no placar.
        textAlign(CENTER);
        textSize(25);
        stroke(200);
        fill(15);
        rect(xmenu1, ymenu4, 100, altura, 30);

        //Mudar cor ao selecionar.
        if (mouseX > xmenu1 && mouseX < xmenu1 + largura && mouseY > ymenu4 && mouseY < ymenu4 + altura) {
            stroke(200);
            fill(0, 0, 200);
            rect(xmenu1, ymenu4, 100, altura, 30);
            if (mouseIsPressed) {
                tela = 5;
            }
        }

        fill(200);
        noStroke();
        text("Pausa", 300, 45)

        //Obstáculos.
        for (i = 0; i < qtobs; i++) {


            rect(xo[i], yo[i], raioobs, raioobs); //pinta quadrado em (xo,yo)

            //opções certas ou erradas dos quadrados.
            fill(200);
            rect(xo[i], yo[i], raioobs, raioobs); //pinta quadrado em (xo,yo)
            fill(0);
            noStroke();
            textAlign(CENTER);
            text(respostas[i], xo[i] + 30, yo[i] + 38);

            yo[i] = yo[i] + velocidade; //desce
            //obstaculos voltam a posição original

            if (yo[i] > 440) { //chegam no final 
                yo[i] = random(-100, -10) //gera y aleatório
            }

            //coloquei pintar disparo aqui
            if (estadodisparo == true) {
                fill(240);
                ellipse(xd, yd, raiodisparo, raiodisparo);

            }

            //Colisão
            if (dist(xo[i], yo[i], xd, yd) < raioobs + raiodisparo && estadodisparo) {
                yo[i] = random(-100, -10) //yinimigo[i] = random(-100, -10)
                estadodisparo = false;

                if (respostas[i] == tabuada * cont) {
                    pontos++;
                    cont++;
                } else {
                    vidas--;
                }

                //ao colidir com obstaculo

                //crie possiveis respostas, começando pela correta
                respostas = [tabuada * cont];
                // e mais tres aleatorias
                while (respostas.length < 4) {

                    valor = randomize()
                    //lembrando que so pode haver na tela numeros diferentes (duplicados passam longe)
                    if (valor != tabuada * cont && !respostas.includes(valor)) {
                        respostas.push(valor);
                    }

                }
                //isto permite gerar uma ordem aleatoria
                respostas.sort(() => Math.random() - 0.5)


            } //fecha colisão
        } //fecha for de obstáculos

        //acontece disparo e atualiza coordenadas xd e yd
        if (keyIsDown(32) && estadodisparo == false) {
            xd = mouseX;
            yd = 540;
            estadodisparo = true;

        }
        //movimenta disparo
        if (estadodisparo == true) {
            fill(240);
            ellipse(xd, yd, raiodisparo, raiodisparo);
            yd = yd - 15;
            if (yd < 0) {
                estadodisparo = false;

            }
        }


        //Subir nivel.
        if (pontos > barreiradepontos) {
            tabuada++;
            barreiradepontos = barreiradepontos + 10;
            velocidade = velocidade + 0.4;
            cont = 1;
            respostas = [tabuada * cont];

            while (respostas.length < 4) {

                valor = randomize()

                if (valor != tabuada * cont && !respostas.includes(valor)) {
                    respostas.push(valor);
                }

            }

            respostas.sort(() => Math.random() - 0.5)


        }

        //jogador morre.
        if (vidas == 0) {
            tela = 4;
        }

        //Jogador ganha.
        if (pontos == 100) {
            tela = 6;
        }
    }

    //tela de opções.
    else if (tela == 3) {
        background(100);

        textAlign(CENTER);
        textSize(30);

        stroke(200);
        fill(15);
        rect(xmenu2, ymenu5, largura, altura, 30);

        //Jogar novamente.
        if (mouseX > xmenu2 && mouseX < xmenu2 + largura && mouseY > ymenu5 && mouseY < ymenu5 + altura) {

            stroke(200);
            fill(0, 0, 200);
            rect(xmenu2, ymenu5, largura, altura, 30);
            if (mouseIsPressed) {
                tela = 1;
            }
        }

        fill(200);
        noStroke();
        textSize(20);
        text("Voltar", 150, 555);


        //Voltar ao menu.
        stroke(200);
        fill(15);
        rect(xmenu3, ymenu5, largura, altura, 30);

        //Mudar cor ao selecionar.
        if (mouseX > xmenu3 && mouseX < xmenu3 + largura && mouseY > ymenu5 && mouseY < ymenu5 + altura) {

            stroke(200);
            fill(0, 0, 200);
            rect(xmenu3, ymenu5, largura, altura, 30);
            if (mouseIsPressed) {
                tela = 7;
            }
        }

        fill(200);
        noStroke();
        text("Próximo", 450, 555);


        //Informações com relação ao jogo, controles, etc.
        fill(200);
        textSize(50);
        textAlign(LEFT);
        text("Instruções ", 175, 60);


        //Informações do jogo.
        fill(200);
        textSize(18);
        textAlign(LEFT);
        text(" - Mostre que você é a lenda da tabuada!!\n - O nível representa a tabuada(nivel 2 = tabuada do 2).\n - Atire no numero que apresenta a resposta da multiplicação mos-\n trada no nivel para ganhar pontos. Se errar, sua vida diminui.\n - Complete toda a tabuada e se torne a lenda.\n\nHABILIDADE:\n(EF03MA03) Construir e utilizar fatos básicos da adição e da\nmultiplicação para o cálculo mental ou escrito (3º ANO).", 50, 115);


        //Controles.
        fill(200);
        textSize(40);
        textAlign(LEFT);
        text("Controles", 200, 355);

        fill(200);
        textSize(20);
        textAlign(LEFT);
        text("* Utilize o mouse para se movimentar na tela\n* Utilize a tecla espaço para atirar nos numeros.", 50, 410);
    }

    //Tela de creditos.
    else if (tela == 7) {

        background(200);

        //Botão voltar.
        textAlign(CENTER);
        textSize(30);

        stroke(200);
        fill(15);
        rect(xmenu, ymenu3, largura, altura, 30);

        //Mudar cor ao selecionar.
        if (mouseX > xmenu && mouseX < xmenu + largura && mouseY > ymenu3 && mouseY < ymenu3 + altura) {

            stroke(200);
            fill(0, 0, 200);
            rect(xmenu, ymenu3, largura, altura, 30);

            if (mouseIsPressed) {
                tela = 3;
            }
        }

        fill(200);
        noStroke();
        text("Voltar", 300, 555);

        //Informações do aluno e educador.
        fill(80);
        rect(230, 70, 320, 115);
        textSize(15);
        text("ALUNO:", 260, 65);
        fill(200);
        textSize(20);
        textAlign(LEFT);
        text("Gabriel Medeiros da Silva.\n-Discente do curso de Ciências e\nTecnologia.\n-Matéria: Lógica de Programação.", 240, 95);
        image(img1, 50, 70, 120, 120);

        fill(80);
        rect(230, 250, 320, 100);
        textSize(15);
        text("EDUCADORA:", 230, 245);
        fill(200);
        textSize(20);
        textAlign(LEFT);
        text("Sandra Maria Chagas da Silva.", 240, 275);
        image(img2, 50, 250, 120, 120);

    }

    //Tela de Morte.
    else if (tela == 4) {
        background(gameover);

        textAlign(CENTER);
        textSize(30);

        stroke(200);
        fill(15);
        rect(xmenu2, ymenu5, largura, altura, 30);

        //Jogar novamente.
        if (mouseX > xmenu2 && mouseX < xmenu2 + largura && mouseY > ymenu5 && mouseY < ymenu5 + altura) {

            stroke(200);
            fill(0, 0, 200);
            rect(xmenu2, ymenu5, largura, altura, 30);
            if (mouseIsPressed) {
                tela = 2;
                vidas = 3
                tabuada = 1;
                pontos = 1;
                cont = 1;
                yo[i] = 0;
                xo[i] = random(100, 500);
                velocidade = 1;
              respostas = [tabuada*cont];
              
              while (respostas.length < 4) {

                valor = randomize()

                if (valor != tabuada * cont && !respostas.includes(valor)) {
                    respostas.push(valor);
                }

            }

            respostas.sort(() => Math.random() - 0.5)

              if (pontos > barreiradepontos) {
            tabuada++;
            barreiradepontos = barreiradepontos + 10;
            velocidade = velocidade + 0.4;
            cont = 1;
            respostas = [tabuada * cont];
              }

            }
        }

        fill(200);
        noStroke();
        textSize(20);
        text("Tentar novamente", 150, 555);


        //Voltar ao menu.
        stroke(200);
        fill(15);
        rect(xmenu3, ymenu5, largura, altura, 30);

        //Retornar ao Menu.
        if (mouseX > xmenu3 && mouseX < xmenu3 + largura && mouseY > ymenu5 && mouseY < ymenu5 + altura) {

            stroke(200);
            fill(0, 0, 200);
            rect(xmenu3, ymenu5, largura, altura, 30);
            if (mouseIsPressed) {
                tela = 1;
                vidas = 3;
                tabuada = 1;
                pontos = 1;
                cont = 1;
                yo[i] = 0;
                xo[i] = random(100, 500);
                velocidade = 1;
              respostas = [tabuada*cont];
              
              while (respostas.length < 4) {

                valor = randomize()

                if (valor != tabuada * cont && !respostas.includes(valor)) {
                    respostas.push(valor);
                }

            }

            respostas.sort(() => Math.random() - 0.5)
              
              if (pontos > barreiradepontos) {
            tabuada++;
            barreiradepontos = barreiradepontos + 10;
            velocidade = velocidade + 0.4;
            cont = 1;
            respostas = [tabuada * cont]
              }

            }
        }

        fill(200);
        noStroke();
        text("Menu", 450, 555);


    }

    //Tela de pausa.
    else if (tela == 5) {
        background(pausa);

        textAlign(CENTER);
        textSize(30);

        stroke(200);
        fill(15);
        rect(xmenu2, ymenu5, largura, altura, 30);

        //Continuar.
        if (mouseX > xmenu2 && mouseX < xmenu2 + largura && mouseY > ymenu5 && mouseY < ymenu5 + altura) {

            stroke(200);
            fill(0, 0, 200);
            rect(xmenu2, ymenu5, largura, altura, 30);
            if (mouseIsPressed) {
                tela = 2;
            }
        }

        fill(200);
        noStroke();
        textSize(20);
        text("Continuar", 150, 555);


        //Voltar ao menu.
        stroke(200);
        fill(15);
        rect(xmenu3, ymenu5, largura, altura, 30);

        //Mudar cor ao selecionar.
        if (mouseX > xmenu3 && mouseX < xmenu3 + largura && mouseY > ymenu5 && mouseY < ymenu5 + altura) {

            stroke(200);
            fill(0, 0, 200);
            rect(xmenu3, ymenu5, largura, altura, 30);
            if (mouseIsPressed) {
                tela = 1;
                vidas = 3;
                tabuada = 1;
                pontos = 1;
                cont = 1;
                yo[i] = 0;
                xo[i] = random(100, 500);
                velocidade = 1;
              respostas = [tabuada*cont];
              
              while (respostas.length < 4) {

                valor = randomize()

                if (valor != tabuada * cont && !respostas.includes(valor)) {
                    respostas.push(valor);
                }

            }

            respostas.sort(() => Math.random() - 0.5)
              
              if (pontos > barreiradepontos) {
            tabuada++;
            barreiradepontos = barreiradepontos + 10;
            velocidade = velocidade + 0.4;
            cont = 1;
            respostas = [tabuada * cont]
              }

            }
        }

        fill(200);
        noStroke();
        text("Menu", 450, 555);

    }

    //Tela de conclusão.
    else if (tela == 6) {
        background(conclusao);

        //Iniciar.
        textAlign(CENTER);
        textSize(30);

        stroke(200);
        fill(15);
        rect(xmenu, ymenu3, largura, altura, 30);

        //Mudar cor ao selecionar.
        if (mouseX > xmenu && mouseX < xmenu + largura && mouseY > ymenu3 && mouseY < ymenu3 + altura) {

            stroke(200);
            fill(0, 0, 200);
            rect(xmenu, ymenu3, largura, altura, 30);
            if (mouseIsPressed) {
                tela = 1

                vidas = 3;
                tabuada = 1;
                pontos = 0;
                cont = 1;
                yo[i] = 0;
                xo[i] = random(100, 500);
                velocidade = 1;
                respostas = [tabuada*cont];
              
              while (respostas.length < 4) {

                valor = randomize()

                if (valor != tabuada * cont && !respostas.includes(valor)) {
                    respostas.push(valor);
                }

            }

            respostas.sort(() => Math.random() - 0.5)

              if (pontos > barreiradepontos) {
            tabuada++;
            barreiradepontos = barreiradepontos + 10;
            velocidade = velocidade + 0.4;
            cont = 1;
            respostas = [tabuada * cont]
              }

            }
        }

        fill(200);
        noStroke();
        text("Menu", 300, 555);

    }

}