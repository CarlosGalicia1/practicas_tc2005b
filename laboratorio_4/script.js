// 1
function createTable(){
    var x = prompt();

    const TBL = document.createElement("table")
    const TBLBODY = document.createElement("tbody");
        
    for(let i = 1; i <= x; i++) {
        row = document.createElement("tr");
        var cell = document.createElement("td");
        var cellText = document.createTextNode(` ${i} `);
        cell.appendChild(cellText);
        row.appendChild(cell);

        var cell = document.createElement("td");
        cellText = document.createTextNode(` ${i**2} `);
        cell.appendChild(cellText);
        row.appendChild(cell);

        var cell = document.createElement("td");
        cellText = document.createTextNode(` ${i**3} `);
        cell.appendChild(cellText);
        row.appendChild(cell);

        TBLBODY.appendChild(row);

    }

    TBL.appendChild(TBLBODY);
    document.body.appendChild(TBL);
    if (x != 0){
        TBL.setAttribute("border", "2");
    }
}



// 2
function sumquestion(){
    var num1 = Math.floor(Math.random()*10);
    var num2 = Math.floor(Math.random()*10);

    const START = Date.now();
    var x = prompt(`Cual es el resultado de la suma de ${num1} y ${num2}`);
    const END = Date.now();

    resp = document.createElement("p");

    if (x == num1 + num2){
        resp.innerText =`Resultado correcto. Tiempo: ${END - START}ms`;
    }
    else{
        resp.innerText = `Resultado incorrecto. Tiempo: ${END - START}ms`;
    }
    document.body.appendChild(resp);
}


// 3
function contador(numarray){
    var positives = 0;
    var negatives = 0;
    var zeros = 0;
    for(let i = 0; i < numarray.length; i++){
        if (numarray[i] > 0){
            positives += 1;
        }
        else if (numarray[i] == 0){
            zeros += 1;
        }
        else{
            negatives += 1;
        }
    }
    console.log([positives, negatives, zeros]);
    resp = document.createElement("p");
    resp.innerText = `Ejercicio 3:   Positivos: ${positives}, Negativos: ${negatives}, Ceros: ${zeros}`;
    document.body.appendChild(resp);
}

list = contador([1,0,-3, 0, 2, 5]);



// 4
function promedios(matriz){
    var promedios = []
    for(let row = 0; row < matriz.length; row++){
        var suma = 0
        for(let elem = 0; elem < matriz[row].length; elem++){
            suma += matriz[row][elem];
        }
        promedios.push((suma / matriz[row].length));
    }
    console.log(promedios);
    resp = document.createElement("p");
    resp.innerText = `Ejercicio 4:  Lista de promedios: ${promedios} `;
    document.body.appendChild(resp);
}

list = promedios([
    [1,1,1,1,1],
    [2,2,2,2,2],
    [3,3,3,3,3],
    [4,4,4,4,4],
    [10,29,4,32,4]
]);


// 5
function inverso(num){
    let numstr = num.toString();
    let splitnum = numstr.split("");
    let reversenum = splitnum.reverse();
    let joinednum = reversenum.join("");
    console.log(joinednum);
    resp = document.createElement("p");
    resp.innerText = `Ejercicio 5:  Numero inverso: ${joinednum} `;
    document.body.appendChild(resp);
    return joinednum;
}

var numinverso = inverso(6483);


// 6
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

header = document.createElement("h3");
header.innerText = `Ejericio 6 Problema: Propiedades de vectores`;
document.body.appendChild(header);

text = document.createElement("p");
text.innerText = `Este problema consiste en la definición de las componentes x, y y z de un vector, asi como los metodos para
el calculo de su magnitud y las proporciones de cada una de las componentes de su dirección.`;
document.body.appendChild(text);

resp = document.createElement("p");
resp.innerText = `Objeto vector (${compx},${compy},${compz}). 
Magnitud del vector: ${magnitud}. 
Dirección del vector: (x: ${direccion.x}, y: ${direccion.y}, z: ${direccion.z})`;
document.body.appendChild(resp);
console.log("Magnitud del vector:", magnitud);
console.log("Dirección del vector:", direccion);