document.getElementById('createGameBtn').addEventListener('click', () => {
    fetch('/game/create', { method: 'GET' })
        .then(response => response.json())
        .then(data => {
            console.log('Juego creado:', data);
            alert('Juego creado exitosamente');
        })
        .catch(error => console.error('Error:', error));
});

const shipsPlayer1 = [
    [0, 0, 0, 0, 0, 0, 0, 1, 1, 1], 
    [0, 0, 0, 1, 1, 1, 0, 0, 0, 0], 
    [1, 0, 0, 0, 0, 0, 0, 0, 1, 0], 
    [1, 0, 1, 0, 0, 0, 1, 0, 1, 0], 
    [0, 0, 1, 0, 0, 0, 1, 0, 1, 0], 
    [0, 0, 1, 0, 1, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0], 
    [0, 0, 0, 0, 0, 1, 1, 0, 0, 0], 
    [1, 1, 1, 1, 0, 0, 0, 0, 0, 0], 
    [0, 0, 0, 0, 1, 1, 1, 1, 1, 0], 
];

// Coordenadas de los barcos para el jugador 2
const shipsPlayer2 = [
    [1, 1, 1, 1, 1, 0, 0, 0, 0, 0], 
    [1, 1, 1, 1, 0, 0, 0, 0, 0, 0], 
    [1, 1, 1, 1, 0, 0, 0, 0, 0, 0], 
    [1, 1, 1, 0, 0, 0, 0, 0, 0, 0], 
    [1, 1, 1, 0, 0, 0, 0, 0, 0, 0], 
    [1, 1, 1, 0, 0, 0, 0, 0, 0, 0], 
    [1, 1, 0, 0, 0, 0, 0, 0, 0, 0], 
    [1, 1, 0, 0, 0, 0, 0, 0, 0, 0], 
    [1, 1, 0, 0, 0, 0, 0, 0, 0, 0], 
    [1, 1, 0, 0, 0, 0, 0, 0, 0, 0], 
];

document.getElementById('placeShipsBtn').addEventListener('click', () => {
    placeShips(1, shipsPlayer1);
    placeShips(2, shipsPlayer2);});

function placeShips(playerNumber, ships) {
    fetch(`/game/create/${playerNumber-1}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ships })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Barcos colocados:', data);
        alert('Barcos colocados exitosamente');
    })
    .catch(error => console.error('Error:', error));
}

document.getElementById('gameStatusBtn').addEventListener('click', getGameStatus);

function getGameStatus() {
    fetch('/game/status')
        .then(response => response.json())
        .then(data => {
            console.log('Estado del juego:', data);
            alert('Estado del juego obtenido');
        })
        .catch(error => console.error('Error:', error));
}

document.getElementById('diceBtn').addEventListener('click', throwDice);

function throwDice() {
    fetch('/dice')
        .then(response => response.json())
        .then(data => {
            alert(`Turno del jugador: ${data.turn}`);
        })
        .catch(error => console.error('Error:', error));
}

document.getElementById('submitCoordinatesBtn').addEventListener('click', makeMove);

function makeMove() {
    // Obtener las coordenadas ingresadas por el usuario
    const coordinatesInput = document.getElementById('coordinatesInput').value;
    // Verificar si coordinatesInput está vacío
    if (!coordinatesInput) {
        alert('Por favor, ingresa las coordenadas.');
        return;
    }

    const coordinates = coordinatesInput.split(',').map(Number);

    // Verificar que las coordenadas tengan el formato correcto
    if (coordinates.length !== 2 || coordinates.some(isNaN)) {
        alert('Por favor, ingresa coordenadas válidas en el formato x , y.');
        return;
    }

    // Obtener el turno actual del juego
    fetch('/game/status')
        .then(response => response.json())
        .then(data => {
            const playerNumber = data.turn; 
            fetch('/game/turn', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ playerNumber, coordinates })
            })
            .then(response => response.json())
            .then(data => {
                if(data.status == 'FINALIZADO'){
                    alert(`El juego ya ha sido finalizado`);
                }
                else{
                    console.log('Movimiento realizado:', data);
                alert(`Disparo ${data.hit.hit ? 'acertado' : 'fallido'}`);
                }

            })
            .catch(error => console.error('Error:', error));
        })
        .catch(error => console.error('Error:', error));
}