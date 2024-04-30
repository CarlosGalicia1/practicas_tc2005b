const fs = require('fs');
const path = require('path');
const Users = require('../models/User');
const { resume } = require('../util/database');
const { stringify } = require('querystring');

module.exports = {
    get: (request, response) => {
        response.cookie("cookie_User" , `getUsers visited: ${new Date().toDateString()}`,{httpOnly:true, secure: true, maxAge:60*1000});
        response.render('RegisterUser');
    },
    getUsers: (request, response, next) => {
        Users.fetchAll()
        .then(([rows, fieldData]) => {
            response.render('vista', {
                usuarios: rows
            });
            console.log(rows);
        })    
        .catch(err => console.log(err));
    },

    insertUser: (request, response, next) => {
        const usuario = new Users(request.body.con1, request.body.con2, (err, user) => {
            if (err) {
                console.error(err);
                response.status(500).send('Error creating user');
                return;
            }
            user.save().then(() => {
                response.status(201).redirect('/getUsers');
            }).catch(err => console.log(err));
        });
    },

    getUser: (request, response, next) => {
        const id = request.params.user_id;
        console.log(`Searching for: ${id}`);
        Users.fetchuser(id)
        .then(([rows, fieldData]) => {
            if(rows == ''){
                console.log(`User: ${id} not found`);
                response.setHeader('Content-Type', 'text/plain');
                response.write(`User: ${id} not found`);
                response.end();
            }
            else{
                console.log(`User: ${id} found!`);
                console.log(rows[0]);
                response.setHeader('Content-Type', 'text/plain');
                response.write(`User: ${id} found!: ${rows[0].usuario}: ${rows[0].password}`);
                response.end();
            }
        })
        .catch(error => {
            console.error(error);
            throw error;
        });
    }
};
