// app.js
document.getElementById('createGameBtn').addEventListener('click', () => {
    fetch('/game/create', { method: 'GET' })
        .then(response => response.json())
        .then(data => {
            console.log('Juego creado:', data);
            alert('Juego creado exitosamente');
        })
        .catch(error => console.error('Error:', error));
});


// Coordenadas de los barcos para el jugador 1
const shipsPlayer1 = [
    [1, 1, 1, 1, 1, 0, 0, 0, 0, 0], // Portaaviones en las primeras 5 columnas de la primera fila
    [1, 1, 1, 1, 0, 0, 0, 0, 0, 0], // Crucero 1 en las primeras 4 columnas de la segunda fila
    [1, 1, 1, 1, 0, 0, 0, 0, 0, 0], // Crucero 2 en las primeras 4 columnas de la tercera fila
    [1, 1, 1, 0, 0, 0, 0, 0, 0, 0], // Destructor 1 en las primeras 3 columnas de la cuarta fila
    [1, 1, 1, 0, 0, 0, 0, 0, 0, 0], // Destructor 2 en las primeras 3 columnas de la quinta fila
    [1, 1, 1, 0, 0, 0, 0, 0, 0, 0], // Destructor 3 en las primeras 3 columnas de la sexta fila
    [1, 1, 0, 0, 0, 0, 0, 0, 0, 0], // Submarino 1 en las primeras 2 columnas de la séptima fila
    [1, 1, 0, 0, 0, 0, 0, 0, 0, 0], // Submarino 2 en las primeras 2 columnas de la octava fila
    [1, 1, 0, 0, 0, 0, 0, 0, 0, 0], // Submarino 3 en las primeras 2 columnas de la novena fila
    [1, 1, 0, 0, 0, 0, 0, 0, 0, 0], // Submarino 4 en las primeras 2 columnas de la décima fila
];

// Coordenadas de los barcos para el jugador 2
const shipsPlayer2 = [
    [1, 1, 1, 1, 1, 0, 0, 0, 0, 0], // Portaaviones en las primeras 5 columnas de la primera fila
    [1, 1, 1, 1, 0, 0, 0, 0, 0, 0], // Crucero 1 en las primeras 4 columnas de la segunda fila
    [1, 1, 1, 1, 0, 0, 0, 0, 0, 0], // Crucero 2 en las primeras 4 columnas de la tercera fila
    [1, 1, 1, 0, 0, 0, 0, 0, 0, 0], // Destructor 1 en las primeras 3 columnas de la cuarta fila
    [1, 1, 1, 0, 0, 0, 0, 0, 0, 0], // Destructor 2 en las primeras 3 columnas de la quinta fila
    [1, 1, 1, 0, 0, 0, 0, 0, 0, 0], // Destructor 3 en las primeras 3 columnas de la sexta fila
    [1, 1, 0, 0, 0, 0, 0, 0, 0, 0], // Submarino 1 en las primeras 2 columnas de la séptima fila
    [1, 1, 0, 0, 0, 0, 0, 0, 0, 0], // Submarino 2 en las primeras 2 columnas de la octava fila
    [1, 1, 0, 0, 0, 0, 0, 0, 0, 0], // Submarino 3 en las primeras 2 columnas de la novena fila
    [1, 1, 0, 0, 0, 0, 0, 0, 0, 0], // Submarino 4 en las primeras 2 columnas de la décima fila
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

// Suponiendo que tienes las coordenadas del disparo
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
        alert('Por favor, ingresa coordenadas válidas en el formato x,y.');
        return;
    }

    // Obtener el turno actual del juego
    fetch('/game/status')
        .then(response => response.json())
        .then(data => {
            const playerNumber = data.turn; 
            console.log(playerNumber);
            fetch('/game/turn', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ playerNumber, coordinates })
            })
            .then(response => response.json())
            .then(data => {
                console.log('Movimiento realizado:', data);
                alert(`Disparo ${data.hit ? 'acertado' : 'fallido'}`);
            })
            .catch(error => console.error('Error:', error));
        })
        .catch(error => console.error('Error:', error));
}

function showPlayerBoard(playerNumber) {
    fetch(`/player/${playerNumber}`)
        .then(data => {
            console.log('Datos del jugador:', data);
            renderBoard(data);
        })
        .catch(error => console.error('Error:', error));
}

function renderBoard(playerData) {
    const boardSize = 10;
    const board = document.createElement('table');

    for (let i = 0; i < boardSize; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < boardSize; j++) {
            const cell = document.createElement('td');
            // Verificar si esta celda tiene un barco
            if (playerData.ships.some(ship => ship.some(coord => coord[0] === i && coord[1] === j))) {
                cell.classList.add('ship');
            }
            // Verificar si esta celda tiene un acierto
            if (playerData.hits.some(hit => hit[0] === i && hit[1] === j)) {
                cell.classList.add('hit');
            }
            // Verificar si esta celda tiene un fallo
            if (playerData.misses.some(miss => miss[0] === i && miss[1] === j)) {
                cell.classList.add('miss');
            }
            row.appendChild(cell);
        }
        board.appendChild(row);
    }

    const gameBoardDiv = document.getElementById('gameBoard');
    gameBoardDiv.innerHTML = ''; // Limpiar cualquier contenido previo
    gameBoardDiv.appendChild(board);
}