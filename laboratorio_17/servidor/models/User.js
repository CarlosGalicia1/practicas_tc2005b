const db = require('../util/database');

module.exports = class User {
    //Constructor de la clase. Sirve para crear un nuevo objeto, y en él se definen las propiedades del modelo
    constructor(valor1, valor2) {
        this.con1 = valor1;
        this.con2 = valor2
    }

    //Este método servirá para guardar de manera persistente el nuevo objeto. 
    save() {
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