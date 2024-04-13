const fs = require('fs');

function escribir(texto) {
    const rutaArchivo = 'file.txt';

    fs.writeFile(rutaArchivo, texto, (error) => {
        if (error) {
            console.error('Error al escribir en el archivo:', error);
        } else {
            console.log('Texto escrito correctamente en el archivo:', rutaArchivo);
        }
    });
}

const textoAEscribir = 'Hola soy Charly';
escribir(textoAEscribir);