function cambiarColor() {
    document.getElementById("info").style.color = "red";
}

function restaurarColor() {
    document.getElementById("info").style.color = "black";
}

var parrafo = document.getElementById("referencias");
var infoBox = document.getElementById("infoBox");

// Agregar evento al pasar el mouse sobre el párrafo
parrafo.addEventListener("mouseover", function() {
    // Mostrar el recuadro de información adicional
    infoBox.style.display = "block";
});

// Agregar evento al quitar el mouse del párrafo
parrafo.addEventListener("mouseout", function() {
    // Ocultar el recuadro de información adicional
    infoBox.style.display = "none";
});