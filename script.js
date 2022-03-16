let order = [];
let clickedOrder = [];
let score = 1;
var playing = false;

const blue = document.querySelector('.blue');
const red = document.querySelector('.red');
const green = document.querySelector('.green');
const yellow = document.querySelector('.yellow');
const buttonstart = document.getElementsByClassName("buttonstart")[0];
const contador = document.getElementsByClassName("contador")[0];
const nextleveldisplay = document.querySelector(".nextleveldisplay");
const gameoverdisplay = document.querySelector(".gameoverdisplay");
const buttonnext = document.getElementsByClassName("buttonnext")[0];
const buttonrestart = document.getElementsByClassName("buttonrestart")[0];
const buttonend= document.getElementsByClassName("buttonend")[0];

//cria ordem aletoria de cores
let shuffleOrder = async () => {
    let colorOrder = Math.floor(Math.random() * 4);
    order[order.length] = colorOrder;
    clickedOrder = [];
    playing = false;
    
    for(let i in order) {
        let elementColor = createColorElement(order[i]);
        elementColor.classList.add('selected');
        await sleep(700);
        elementColor.classList.remove('selected');
        await sleep(400);
    }
    playing = true;
}

function sleep(timeout) {
    return new Promise(function(resolve) {
        return setTimeout(() => {
           resolve() 
        }, timeout);
    })
}

//checa se os botoes clicados são os mesmos da ordem gerada no jogo
let checkOrder = async () => {
    for(let i in clickedOrder) {
        if(clickedOrder[i] != order[i]) {
            gameOver();
            return;
        }
    }
    if(clickedOrder.length == order.length) {
        await sleep(400);
        nextLevel();
    }
}

//funcao para o clique do usuario
let click = (color) => {
    if(!playing){
        return;
    }

    clickedOrder[clickedOrder.length] = color;
    createColorElement(color).classList.add('selected');

    setTimeout(() => {
        createColorElement(color).classList.remove('selected');
        checkOrder();
    },250);
}

//funcao que retorna a cor
let createColorElement = (color) => {
    if(color == 0) {
        return green;
    } else if(color == 1) {
        return red;
    } else if (color == 2) {
        return yellow;
    } else if (color == 3) {
        return blue;
    }
}

//inicia o jogo
let start = function(){
    order = [];
    clickedOrder = [];
    score = 1;
    contador.innerHTML = score;
    playing = true;
    buttonstart.classList.add("hide");
    shuffleOrder();
}

//funcao para proximo nivel do jogo
let nextLevel = () => {
    playing = false;
    nextleveldisplay.classList.remove("hide");
}

//funcao para game over
let gameOver = () => {
    playing = false;
    gameoverdisplay.classList.remove("hide");
}

buttonrestart.onclick = () => {
    order = [];
    clickedOrder = [];
    gameoverdisplay.classList.add("hide");
    start();
}

buttonnext.onclick = async () => {
    nextleveldisplay.classList.add("hide");
    score++;
    contador.innerHTML = score;
    await sleep(400);
    shuffleOrder();
}

buttonend.onclick = () => {
    nextleveldisplay.classList.add("hide");
    gameoverdisplay.classList.add("hide");
    buttonstart.classList.remove("hide");
    score = 1;
    contador.innerHTML = score;
}

green.onclick = () => click(0);
red.onclick = () => click(1);
yellow.onclick = () => click(2);
blue.onclick = () => click(3);

buttonstart.onclick = () => start();
contador.innerHTML = score;