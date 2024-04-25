const http = require('http');
const fs = require('fs');
const path = require('path');
const express = require('express');
var cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');
const app = express();

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/img', express.static(path.join(__dirname, 'img')));
app.use('/js', express.static(path.join(__dirname, 'js')));


const PORT = 3000;

app.set('view engine', 'ejs');

//Sesiones
app.use(session({
  secret: 'some secret',
  cookie: {maxAge: 30000}, 
  resave: false, //La sesión no se guardará en cada petición, sino sólo se guardará si algo cambió 
  saveUninitialized: false, //Asegura que no se guarde una sesión para una petición que no lo necesita
}));

//rutas GET
app.use('/', require('./routes/root'));

//ruta POST del formulario
app.use('/', require('./routes/postform'));

//ruta GET y POST del login
app.use('/', require('./routes/login'));

app.get('/logout', (request, response, next) => {
  request.session.destroy(() => {
      response.redirect('/');
  });
  console.log("Sesion terminada")
});

app.use((request, response, next) => {
  response.render('404');
});



app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});