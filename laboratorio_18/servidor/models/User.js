const db = require('../util/database');
const bcrypt = require('bcryptjs');

module.exports = class User {
    //Constructor de la clase. Sirve para crear un nuevo objeto, y en él se definen las propiedades del modelo
    constructor(valor1, valor2, callback) {
        this.con1 = valor1;
        
        bcrypt.hash(valor2, 12, (err, hash) => {
            if (err) {
                console.error(err);
                callback(err);
                return;
            }
            console.log(hash);
            this.con2 = hash;
            callback(null, this);
        });

    }

    //Este método servirá para guardar de manera persistente el nuevo objeto. 
    save() {
        if (!this.con1 || !this.con2) {
            throw new Error('Valores no listos');
        }
        return db.execute('INSERT INTO usuarios (usuario, password) VALUES (?, ?);',
        [this.con1, this.con2]
        );
    }

    //Este método servirá para devolver los objetos del almacenamiento persistente.
    static fetchAll() {
        return db.execute('SELECT * FROM usuarios;');
    }

    static fetchuser(name){
        return db.execute(`SELECT * FROM usuarios WHERE usuario = '${name}'`);
    }
    

}