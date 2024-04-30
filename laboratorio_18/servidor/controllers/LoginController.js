const Users = require('../models/User');
const bcrypt = require('bcryptjs');

module.exports = {
    get : (request, response) =>{
        const fechaActual = new Date();
        const fechaConHora = `${fechaActual.toDateString()} ${fechaActual.toTimeString()}`;
        request.session.valor_encriptado = `Sesion iniciada en ${fechaConHora}`;
        response.render('login');
    },
    post : (request, response) =>{
        console.log(request.sessionID);
        console.log(request.session.valor_encriptado);
        const id = request.body.con1;
        console.log(`Searching for: ${id}`);
        Users.fetchuser(id)
        .then(([rows, fieldData]) => {
            if(rows == ''){
                console.log(`User: ${id} not found`);
                console.log(`Incorrect user or password`);
                response.redirect('/login');
            }
            else{
                console.log(`User: ${id} found!`);
                console.log(rows[0]);


                bcrypt.compare(request.body.con2, rows[0].password)
                .then(doMatch => {
                    if (doMatch) {
                        request.session.isLoggedIn = true;
                        request.session.user = rows[0].usuario;
                        console.log(`Welcome ${rows[0].usuario}`)
                        return request.session.save(err => {
                            response.redirect('/lab18');
                        });
                    }
                    console.log(`Incorrect user or password`);
                    response.redirect('/login');
                }).catch(err => {
                    response.redirect('/login');
                });
            }
        })
        .catch(error => {
            console.error(error);
            throw error;
        });

    }
}