const fs = require('fs');

let json = [];

try {
    const data = fs.readFileSync('./models/passwords.json', 'utf8');

    if (data) {
        json = JSON.parse(data);
    }
} catch (err) {
    console.error('Error al leer el archivo JSON:', err);
    return;
}

module.exports = class Passwords {
    //Constructor de la clase. Sirve para crear un nuevo objeto, y en él se definen las propiedades del modelo
    constructor(valor1, valor2) {
        this.con1 = valor1;
        this.con2 = valor2
    }

    //Este método servirá para guardar de manera persistente el nuevo objeto. 
    save() {
        json.push({
            con1: this.con1,
            con2: this.con2
        });

        // Escribe datos al json
        try {
            fs.writeFileSync('./models/passwords.json', JSON.stringify(json, null, 2));
            console.log('Datos añadidos correctamente al archivo JSON');
        } catch (err) {
            console.error('Error al escribir en el archivo JSON:', err);
            response.status(500).send('Error en el servidor');
            return;
        }
    }

    //Este método servirá para devolver los objetos del almacenamiento persistente.
    static fetchAll() {
        return json;
    }

}