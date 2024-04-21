const express = require('express');
const router = express.Router();
const path = require('path');

router.get('^/$|/index(.html)?', (request, response, next) => {
    response.sendFile(path.join(__dirname,'..', 'views', 'index.html')); 
  });
  
router.get('^/$|/lab11(.html)?', (request, response, next) => {
  response.sendFile(path.join(__dirname,'..', 'views', 'lab11.html')); 
});

  router.get('^/lab3(.html)?', (request, response, next) => {
    response.sendFile(path.join(__dirname,'..', 'views', 'lab3.html')); 
  });
  
  router.get('^/lab1(.html)?', (request, response, next) => {
    response.sendFile(path.join(__dirname,'..', 'views', 'lab1.html'));  
  });
  
  router.get('^/validarpassword(.html)?', (request, response, next) => {
    response.sendFile(path.join(__dirname,'..', 'views', 'validarpassword.html'));
  });

module.exports = router;