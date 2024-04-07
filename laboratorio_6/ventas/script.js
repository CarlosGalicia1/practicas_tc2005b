
const tomateprecio = 10;
const manzanaprecio = 20;
const limonprecio = 30;

totaltomates = 0;
totalmanzanas = 0;
totallimones = 0;

preciofinal = document.getElementById("total");

document.getElementById("cant").addEventListener("input", function() {
    tomates = document.getElementById("cant");
    num = 0;
    if (parseInt(tomates.value) > 0){
        num = parseInt(tomates.value) * tomateprecio;
    }

    preciot = document.getElementById("tomates");
    preciot.innerText = `Tomates: $${num}`;

    totaltomates = num;
    preciofinal.innerText = `Total: $${totaltomates+totalmanzanas+totallimones}`;

});

document.getElementById("canm").addEventListener("input", function() {
    manzanas = document.getElementById("canm");
    num = 0;
    if (parseInt(manzanas.value) > 0){
        num = parseInt(manzanas.value) * manzanaprecio;
    }
    preciot = document.getElementById("manzanas");
    preciot.innerText = `Manzanas: $${num}`;

    totalmanzanas = num;
    preciofinal.innerText = `Total: $${totaltomates+totalmanzanas+totallimones}`;
});

document.getElementById("canl").addEventListener("input", function() {
    limones = document.getElementById("canl");
    num = 0;
    if (parseInt(limones.value) > 0){
        num = parseInt(limones.value) * limonprecio;
    }
    preciot = document.getElementById("limones");
    preciot.innerText = `Limones: $${num}`;

    totallimones = num;
    preciofinal.innerText = `Total: $${totaltomates+totalmanzanas+totallimones}`;
});

