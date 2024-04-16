const http = require('http');
const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/img', express.static(path.join(__dirname, 'img')));

const PORT = 3000;

//rutas GET
app.use('/', require('./routes/root'));

//ruta POST del formulario
app.use('/', require('./routes/postform'));

app.use((request, response, next) => {
  response.sendFile(path.join(__dirname, 'views', '404.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});