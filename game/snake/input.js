const inputDirection = {
    x: 0,
    y: 0,
};

let lastInputDirection = {
    x: 0,
    y: 0,
};

// Evento em toda a página
window.addEventListener('keydown', (e) => {
    console.log(e);
    switch (
        e.key //Oque retornar de event.key
    ) {
        case 'w': //Sobe uma 'casinha', os eixos são invertidos então negativo sobre e positio desce
            if (lastInputDirection.y !== 0) break;
            inputDirection.x = 0;
            inputDirection.y = -1;
            break;
        case 's':
            if (lastInputDirection.y !== 0) break;
            inputDirection.x = 0;
            inputDirection.y = 1;
            break;
        case 'a':
            if (lastInputDirection.x !== 0) break;
            inputDirection.x = -1;
            inputDirection.y = 0;
            break;
        case 'd':
            if (lastInputDirection.x !== 0) break;
            inputDirection.x = 1;
            inputDirection.y = 0;
            break;
    }
});

export function getInputDirection() {
    lastInputDirection = inputDirection;
    return inputDirection;
}
