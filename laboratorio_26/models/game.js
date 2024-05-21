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
        if (this.status !== 'JUGANDO') {
            throw new Error('Game is not in a playable state');
        }
        const opponent = playerNumber === 1 ? 2 : 1;
        const hit = this.players[opponent-1].ships.some(ship =>
            ship.some(([x, y]) => x === coordinates[0] && y === coordinates[1])
        );

        if (hit) {
            this.players[playerNumber-1].hits.push(coordinates);
        } else {
            this.players[playerNumber-1].misses.push(coordinates);
            this.turn = opponent;
        }

        if (this.players[opponent-1].ships.every(ship => 
            ship.every(([x, y]) => this.players[playerNumber-1].hits.some(([hx, hy]) => hx === x && hy === y))
        )) {
            this.state = 'FINALIZADO';
        }

        return hit;
    }
}

module.exports = Game;
