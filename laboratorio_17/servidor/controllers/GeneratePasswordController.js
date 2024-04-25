const fs = require('fs');
const path = require('path');
const Password = require('../models/Password');

module.exports = {
    get: (request, response) => {
        response.cookie("cookie_Generatepassword" , `Generatepassword visited: ${new Date().toDateString()}`,{httpOnly:true, secure: true, maxAge:60*1000});
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
