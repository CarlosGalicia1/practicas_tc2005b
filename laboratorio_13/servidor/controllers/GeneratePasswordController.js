const fs = require('fs');
const path = require('path');
const Password = require('../models/Password');

module.exports = {
    get: (request, response) => {
        response.render('Generatepassword');
    },
    post: (request, response, next) => {
        const con1 = request.body.con1;
        const con2 = request.body.con2;

        const password = new Password(con1, con2);
        
        password.save();

        const logs = Password.fetchAll();
        response.setHeader('Content-Type', 'text/plain');
        response.send(logs);
    }
};
