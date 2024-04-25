module.exports = {
    get : (request, response) =>{
        const fechaActual = new Date();
        const fechaConHora = `${fechaActual.toDateString()} ${fechaActual.toTimeString()}`;
        request.session.valor_encriptado = `Sesion iniciada en ${fechaConHora}`;
        response.send("Simulacion de sesion iniciada")
    },
    post : (request, response) =>{
        console.log(request.sessionID);
        console.log(request.session.valor_encriptado);
        response.sendStatus(200);
    }
}