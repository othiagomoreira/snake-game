import { getInputDirection } from './input.js';
import { gameBoard, isOutsideBoard } from '../board/index.js';

//Velocidade da cobra, 5frames por segundo
export const SNAKE_SPEED = 5;

let newSegments = 0;

// Cobrinha, formada por uma lista de objetos de 'coordenadas'
const snakeBody = [{ x: 11, y: 11 }];

export function update() {
    addSegments();

    const inputDirection = getInputDirection();

    // Move snake segments
    for (let i = snakeBody.length - 2; i >= 0; i--) {
        snakeBody[i + 1] = { ...snakeBody[i] };
    }

    // Make head move
    snakeBody[0].x += inputDirection.x;
    snakeBody[0].y += inputDirection.y;
}

// 'Desenha' na tela a cobrinha
export function drow() {
    snakeBody.forEach((segment) => {
        // Create element
        const snakeElement = document.createElement('div');

        // Config css
        snakeElement.classList.add('snake');

        // Position
        // Posiciona utilizando o grid como coordenadas
        // Os eixos sao invertidos, o X na vertical e o Y na horizontal
        snakeElement.style.gridRowStart = segment.y;
        snakeElement.style.gridColumnStart = segment.x;

        // Append on DOM
        gameBoard.append(snakeElement);
    });
}

// Identifica quando o objeto entra em contato com outro
// Comida, ele mesmo e nas bordas do BOARD
export function collison(position) {
    // some --> se pelo menos uma das condições for positiva retornará TRUE, se todas forem negativas retornará FALSE
    return snakeBody.some((segment) => {
        // Se a posiçao do eixo Y e do X do objeto externo e do objeto que está em loop foram iguais
        return position.x === segment.x && position.y === segment.y;
    });
}

// Expandindo a cobra

// Recebe a quantida de segmentos que a cobra deve crescer
export function expandSnake(amount) {
    newSegments += amount;
}

// Verifica se existe novos segmentos e renderiza o mesmo
function addSegments() {
    if (newSegments > 0) {
        // Faz uma copia do ultimo elemento do array e adiciona mais 1
        snakeBody.push({
            ...snakeBody[snakeBody.length - 1],
        });

        // Cada vez que adicionar um segmento a cobra, retire um do newSegments
        newSegments -= 1;
    }
}

// Auxiliar functions

// Verifica se a cabeça da cobra saiu do board
export function getSnakeHead() {
    return snakeBody[0];
}

// Verifica se a cabeça da cobra teve uma colisão com alguma parte do corpo
export function hasSelfCollison() {
    const snakeHead = snakeBody[0];

    return snakeBody.some((segment, index) => {
        if (index === 0) return false;

        return snakeHead.x === segment.x && snakeHead.y === segment.y;
    });
}
