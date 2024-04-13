function promedio(numeros) {
    if (numeros.length === 0) {
        return 0;
    }
    
    var suma = 0;
    for (var i = 0; i < numeros.length; i++) {
        suma += numeros[i];
    }

    var promedio = suma / numeros.length;
    return promedio;
}

var arregloNumeros = [10, 20, 30, 40, 50];
var promedio = promedio(arregloNumeros);
console.log("El promedio es:", promedio);