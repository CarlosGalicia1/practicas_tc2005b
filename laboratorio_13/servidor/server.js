const http = require('http');
const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/img', express.static(path.join(__dirname, 'img')));
app.use('/js', express.static(path.join(__dirname, 'js')));


const PORT = 3000;

app.set('view engine', 'ejs');

//rutas GET
app.use('/', require('./routes/root'));

//ruta POST del formulario
app.use('/', require('./routes/postform'));

app.use((request, response, next) => {
  response.render('404');
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});