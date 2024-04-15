const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((request, response) => {
  switch(request.url){
    case "/":
        response.setHeader('Content-Type', 'text/html');
        const html = fs.readFileSync(path.resolve(__dirname, './views/index.html'), 'utf8');
        response.write(html);
        response.end();   
        break;
    case "/index":
        response.setHeader('Content-Type', 'text/html');
        const main = fs.readFileSync(path.resolve(__dirname, './views/index.html'), 'utf8');
        response.write(main);
        response.end();   
        break;
    case "/lab3":
      response.setHeader('Content-Type', 'text/html');
      const lab3 = fs.readFileSync(path.resolve(__dirname, './views/lab3.html'), 'utf8');
        response.write(lab3);
        response.end(); 
    case "/validarpassword":
        if(request.method == "GET"){
            response.setHeader('Content-Type', 'text/html');
            const validar = fs.readFileSync(path.resolve(__dirname, './views/validarpassword.html'), 'utf8')
            response.write(validar);
            response.end();  
        }else if(request.method == "POST"){
            let body = [];
            request
            .on('data', chunk => {
                body.push(chunk);
            })
            .on('end', () => {
                body = Buffer.concat(body).toString();
                console.log(body);
                const con1 = body.split('&')[0].split('=')[1];
                console.log(con1);
                const con2 = body.split('&')[1].split('=')[1];
                console.log(con2);

                fs.appendFile('./logs/validatelog.txt',`con1: ${con1}  -  con2:${con2} \n`,(err) => {
                  if (err) throw err;
                  console.log('Datos guardados correctamente.');
                });
                response.setHeader('Content-Type', 'text/html');
                response.statusCode = 200;
                response.write('{code:200, msg:"Ok POST"}');
                response.end();
            });  
        }    
        break;
    default:
      response.setHeader('Content-Type', 'text/html');
      const error404 = fs.readFileSync(path.resolve(__dirname, './views/404.html'), 'utf8');
        response.write(error404);
        response.end();
        break;
}
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
