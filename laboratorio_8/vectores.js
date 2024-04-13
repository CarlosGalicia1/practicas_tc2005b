var vector = {
    x: 0,
    y: 0,
    z: 0,

    crearComponentes: function(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    },

    getMagnitud: function() {
        return Math.sqrt((this.x**2) + (this.y**2) + (this.z**2));
    },


    getDireccion: function() {
        var magnitud = this.getMagnitud();
        if (magnitud === 0) {
            return {x: 0, y: 0, z: 0};
        } else {
            return {x: this.x / magnitud, y: this.y / magnitud, z: this.z / magnitud};
        }
    }
};

// Ejemplo de uso
var compx = 3;
var compy = 4;
var compz = 5;
vector.crearComponentes(compx, compy, compz);
var magnitud = vector.getMagnitud();
var direccion = vector.getDireccion();
console.log(`Objeto vector (${compx},${compy},${compz}).`);
console.log("Magnitud del vector:", magnitud);
console.log("Dirección del vector:", direccion);