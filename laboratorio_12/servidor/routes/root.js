const express = require('express');
const router = express.Router();
const path = require('path');

router.get('^/$|/index(.html)?', (request, response, next) => {
    response.render('index');
  });
  
  router.get('^/$|/lab11(.html)?', (request, response, next) => {
    response.render('lab11'); 
  });
  
  router.get('^/$|/lab8(.html)?', (request, response, next) => {
    response.render('lab8'); 
  });

  router.get('^/lab3(.html)?', (request, response, next) => {
    response.render('lab3');
  });
  
  router.get('^/lab1(.html)?', (request, response, next) => {
    response.render('lab1');  
  });
  
  router.get('^/validarpassword(.html)?', (request, response, next) => {
    response.render('validarpassword');
  });

module.exports = router;