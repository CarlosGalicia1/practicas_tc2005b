// web server (automatic listener, admiter and register of log events) with only nodejs
const http = require('http');
const path = require('path');
const fs = require('fs');
const fsPromises = require('fs').promises;

const logEvents = require('./logEvents');
const EventEmitter = require('events');
class Emitter extends EventEmitter {};
// initialize object
const myEmitter = new Emitter;

// add a listener for log event
myEmitter.on('log', (msg,fileName) => logEvents(msg, fileName));

// port for web server
const PORT = process.env.PORT || 3500;

//function to serve files
const serveFile = async (filePath, contentType, response) => {
    try{
        const rawData = await fsPromises.readFile(
            filePath,
            !contentType.includes('image') ? 'utf8' : '' //if contenttype is not an image read as utf8, else put an ''
        );
        const data = contentType === 'application/json' // if content type is json
            ? JSON.parse(rawData) : rawData; // trasform raw data to json data, otherwise the value wil be rawData
        response.writeHead(
            filePath.includes('404.html') ? 404 : 200, // if 404.html is displayed, send a 404 status, else send a 200 status
             {'Content-Type': contentType});
        response.end(
            contentType === 'application/json' ? JSON.stringify(data) : data
        );
    } catch (err) {
        console.log(err);
        myEmitter.emit('log', `${err.name} : ${err.message}`, 'errLog.txt'); // save the logs on the errLog.txt
        response.statusCode = 500;
        response.end();
    }
}


const server = http.createServer((req, res) => {
    console.log(req.url, req.method);
    //Emit event
    myEmitter.emit('log', `${req.url}\t${req.method}`, 'reqLog.txt'); // save the logs on the reqLog.txt

    const extension = path.extname(req.url); // define extension

    let contentType;

    switch (extension) { // define content type
        case '.css':
            contentType = 'text/css';
            break;
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.json':
            contentType = 'application/json';
            break; 
        case '.jpg':
            contentType = 'image/jpeg';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.txt':
            contentType = 'text/plain';
            break;  
        default:
            contentType = 'text/html';
    }

    let filePath = 
        contentType === 'text/html' && req.url === '/' // if the content type is html and the url is just a "/"...
            ? path.join(__dirname, 'views', 'index.html') // the value is the path to the index.html file in the views directory
            : contentType === 'text/html' && req.url.slice(-1) === '/' // else, if the content type is html and the last character in the url is "/"...
                ? path.join(__dirname, 'views', req.url, 'index.html') // the value is the path to the subdirectory main page index.html
                : contentType === 'text/html' // else, if the content type is an html file...
                    ? path.join(__dirname, 'views', req.url) // the value is the path to whatever url is requested in the views folder
                    : path.join(__dirname, req.url); // else, use the directory name

    if(!extension && req.url.slice(-1) !== '/'){ // if there is no extension and the request is not equal to a '/'
        filePath += '.html'; // make the .html extension not required in the browser
    } 
    // check if the file to serve exists
    const fileExists = fs.existsSync(filePath);
    if (fileExists){
        serveFile(filePath, contentType, res); //serve the file
    }
    else{
        //404 case response
        serveFile(path.join(__dirname, 'views','404.html'), 'text/html', res);
        
    }
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
