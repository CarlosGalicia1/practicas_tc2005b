const express = require('express');
const router = express.Router();
const path = require('path');

const lab1controller = require('../controllers/Lab1Controller');
const lab3controller = require('../controllers/Lab3Controller');
const lab8controller = require('../controllers/Lab8Controller');
const lab11controller = require('../controllers/Lab11Controller');
const lab12controller = require('../controllers/Lab12Controller');
const lab13controller = require('../controllers/Lab13Controller');
const lab17controller = require('../controllers/Lab17Controller');
const generatepasswordcontroller = require('../controllers/GeneratePasswordController');
const cookiescontroller = require('../controllers/CookiesController');

router.get('^/$|/index(.html)?', lab17controller.get);
router.get('^/$|/lab13(.html)?', lab13controller.get);
router.get('^/$|/lab12(.html)?', lab12controller.get);
router.get('^/$|/lab11(.html)?',lab11controller.get);
router.get('^/$|/lab8(.html)?', lab8controller.get);
router.get('^/lab3(.html)?', lab3controller.get);
router.get('^/lab1(.html)?', lab1controller.get);
router.get('^/Generatepassword(.html)?',generatepasswordcontroller.get);
router.get('^/getcookies', cookiescontroller.get);
router.get('^/deletecookies', (request, response) => {
    console.log(request.cookies)
    response.clearCookie('cookie_lab1');
    response.clearCookie('cookie_lab3');
    response.clearCookie('cookie_lab8');
    response.clearCookie('cookie_lab11');
    response.clearCookie('cookie_lab12');
    response.clearCookie('cookie_lab13');
    response.clearCookie('cookie_Generatepassword');
    response.clearCookie('cookie_getcookies');

    response.send("Todas las cookies eliminadas")
    response.end();
})

module.exports = router;