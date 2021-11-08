import { gameBoard, generateRandomBoardPosition } from '../board/index.js';
import { collison as snakeCollison, expandSnake } from '../snake/index.js';

const EXPANSION_RATE = 2;

let foodPosition = generateRandomPosition();

// valida se a cada frame gerado, a cobrinha não colidiu
export function update() {
    // Se a cobra colidir com a comida gere uma nova posição para a comida
    if (snakeCollison(foodPosition)) {
        expandSnake(EXPANSION_RATE);
        foodPosition = generateRandomPosition();
    }
}

// Cria a comida
export function draw() {
    // Create element
    const foodElement = document.createElement('div');

    // Config css
    foodElement.classList.add('food');

    // Position
    foodElement.style.gridRowStart = foodPosition.y;
    foodElement.style.gridColumnStart = foodPosition.x;

    // Append on DOM
    gameBoard.append(foodElement);
}

// Responsavel por gerar a comida aleatoriamente
function generateRandomPosition() {
    let newFoodPosition;

    // enquanto a condição for TRUE exucuta
    while (newFoodPosition === undefined || snakeCollison(newFoodPosition)) {
        newFoodPosition = generateRandomBoardPosition();
    }

    return newFoodPosition;
}
