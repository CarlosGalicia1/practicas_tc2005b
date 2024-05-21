const express = require('express');
const router = express.Router();
const game = require('../gameInstance'); // Importar la instancia del juego

router.get('/', (req, res) => {
    res.render('index');
});
router.get('/dice', (req, res) => {
    if(game.status === 'SETEANDO'){
        const turn = Math.floor(Math.random() * 2) + 1;
        game.turn = turn;
        res.status(200).json({ turn });
    }
    else{
        res.status(200).json({message: 'Juego en progreso' });
    }
});

router.get('/player/:playerNumber', (req, res) => {
    const playerNumber = parseInt(req.params.playerNumber);
    res.status(200).json(game.players[playerNumber-1]);
});

module.exports = router;
