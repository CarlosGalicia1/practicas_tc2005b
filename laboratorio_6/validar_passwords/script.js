document.getElementById("submitbutton").addEventListener("click", function() {
    // Obtener los valores de los inputs
    var valorInput1 = document.getElementById("con1").value;
    var valorInput2 = document.getElementById("con2").value;

    // Comparar los valores
    if (valorInput1 == '' || valorInput2 == ''){
        alert("Completa todos los campos")
    }
    else if (valorInput1 === valorInput2) {
        alert("Las contraseñas son iguales");
    } else {
        alert("Las contraseñas no son iguales");
    }
});