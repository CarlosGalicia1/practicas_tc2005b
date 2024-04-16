const express = require('express');
const router = express.Router();
const path = require('path');

router.post('^/validarpassword(.html)?', (request, response, next) => {
    const con1 = request.body.con1;
    const con2 = request.body.con2;
    console.log(`con1: ${con1}  -  con2:${con2} \n`)
    response.setHeader('Content-Type', 'application/json');
    response.write('{code:200, msg:"Ok POST"}');
    response.end();
  });

module.exports = router;