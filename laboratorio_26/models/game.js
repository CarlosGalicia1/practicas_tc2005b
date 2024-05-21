class Game {
    constructor() {
        this.resetGame();
    }

    resetGame() {
        this.players = [this.createPlayer(), this.createPlayer()];
        this.turn = Math.floor(Math.random() * 2) + 1;
        this.status = 'SETEANDO';
    }

    createPlayer() {
        return {
            ships: [],
            hits: [],
            misses: []
        };
    }

    getGameStatus() {
        return {
            status: this.status,
            turn: this.turn,
            players: this.players
        };
    }

    placeShips(playerNumber, ships) {
        if (this.status !== 'SETEANDO') {
            throw new Error('Game is not in setup state');
        }

        if (playerNumber < 0 || playerNumber >= this.players.length) {
            throw new Error('Invalid player number');
        }

        this.players[playerNumber].ships = ships;

        if (this.players.every(player => player.ships.length > 0)) {
            this.status = 'JUGANDO';
        }
    }

    makeMove(playerNumber, coordinates) {
        if (this.status === 'INICIADO' || this.status === 'FINALIZADO') {
            return { error: 'El juego no está en estado activo.' };
        }

        const opponent = playerNumber === 1 ? 2 : 1;
        const [x, y] = coordinates;

        // Verificar si ya se hizo un movimiento en esta coordenada
        if (this.players[playerNumber - 1].hits.some(hit => hit.x === x && hit.y === y) ||
            this.players[playerNumber - 1].misses.some(miss => miss.x === x && miss.y === y)) {
            return { error: 'Movimiento ya realizado en esta coordenada.' };
        }

        let hit = false;
        //Verificar si el barco a sido golpeado
        if (this.players[opponent - 1].ships[x][y] == 1) {
            this.players[playerNumber - 1].hits.push({ x, y });
            this.turn = playerNumber;
            hit = true;
        }

        if (!hit) {
            this.players[playerNumber - 1].misses.push({ x, y });
            // Alternar turno
            this.turn = opponent;
        }   


        // Verificar si el juego ha terminado
        console.log(this.players[playerNumber - 1].hits);
        const allShipsSunk = this.players[opponent - 1].ships.every((row, rowIndex) =>
            row.every((cell, colIndex) => cell === 0 || this.players[playerNumber - 1].hits.some(hit => hit.x === rowIndex && hit.y === colIndex))
        );

        console.log(allShipsSunk);
        if (allShipsSunk) {
            this.status = 'FINALIZADO';
        }
        

        return { hit, status: this.status };
    }
}

module.exports = Game;
