const express = require('express');
const path = require('path');
const app = express();
const gameRoutes = require('./routes/game');
const playerRoutes = require('./routes/player');

// Configurar el motor de vistas
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use('/', playerRoutes);
app.use('/game', gameRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
