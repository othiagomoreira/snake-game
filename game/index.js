import {
    SNAKE_SPEED,
    drow as snakeDraw,
    update as snakeUpdate,
    getSnakeHead,
    hasSelfCollison,
} from '../game/snake/index.js';
import { gameBoard, isOutsideBoard } from './board/index.js';
import { draw as foodDraw, update as foodUpdate } from '../game/food/index.js';

//Quanto tempo se passou desde a ultima vez que a cobra andou
let lastTimeRender = 0;

function main(currentTime) {
    // Se o usuario morrer
    if (checkGameOver()) {
        if (confirm('Você perdeu!')) {
            window.location.reload();
        } else {
            window.requestAnimationFrame(main);
        }

        return;
    }

    // current time -> miliseconds
    window.requestAnimationFrame(main);

    //Retorna em segundos
    const secondsSinceLastRender = (currentTime - lastTimeRender) / 1000;

    // Enquanto não acumular a quantidade de tempo 1 / 5, ou seja 0.2s nao irá andar
    if (secondsSinceLastRender < 1 / SNAKE_SPEED) return;

    // A cobra anda 5 vezes a cada segundo, se mundar o valor de SNAKE_SPEED para 1, irá andar uma vez a cada 1 segundo
    lastTimeRender = currentTime;

    update(); //Atualizão da cobrinha ou da comida

    drow(); // 'Desenha' na tela a cobrinha ou a comida controlando a lógica
}

function update() {
    gameBoard.innerHTML = ''; // Limpa o board quando a cobrinha esta andando
    snakeUpdate();
    foodUpdate();
}

function drow() {
    snakeDraw();
    foodDraw();
}

// Verifica quando o jogo acaba
function checkGameOver() {
    return isOutsideBoard(getSnakeHead()) || hasSelfCollison();
}

// Pega 1 frame de animação / Recebe como argumento uma função calbeck
window.requestAnimationFrame(main);
