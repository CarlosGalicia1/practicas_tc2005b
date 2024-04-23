const fs = require('fs');
const express = require('express');
const router = express.Router();
const path = require('path');

router.post('^/validarpassword(.html)?', (request, response, next) => {
    const con1 = request.body.con1;
    const con2 = request.body.con2;
    fs.appendFileSync('./logs/validatelog.txt',`con1: ${con1}  -  con2:${con2} \n`,(err) => {
      if (err) throw err;
      console.log('Datos guardados correctamente.');
    });
    response.setHeader('Content-Type', 'text/plain');
    const logs = fs.readFileSync(path.resolve(__dirname, '../logs/validatelog.txt'), 'utf8');
    response.write(logs);
    response.end();
  });

module.exports = router;