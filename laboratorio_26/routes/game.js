const express = require('express');
const router = express.Router();
const game = require('../gameInstance'); // Importar la instancia del juego

router.get('/create', (req, res) => {
    game.resetGame();
    res.status(200).json({ message: 'Juego creado exitosamente' });
});

router.post('/create/:player', (req, res) => {
    const playerNumber = parseInt(req.params.player);
    const ships = req.body.ships;

    try {
        game.placeShips(playerNumber, ships);
        res.status(200).json({ message: 'Barcos colocados existosamente' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/status', (req, res) => {
    res.status(200).json(game.getGameStatus());
});

router.post('/turn', (req, res) => {
    const { playerNumber, coordinates } = req.body;
    try {
        const hit = game.makeMove(playerNumber, coordinates);
        res.status(200).json({ hit });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
