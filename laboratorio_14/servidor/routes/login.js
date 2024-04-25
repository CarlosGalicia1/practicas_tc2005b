const express = require('express');
const router = express.Router();
const path = require('path');
const logincontroller = require('../controllers/LoginController');

router.get('^/login', logincontroller.get);

router.post('^/login',logincontroller.post);

module.exports = router;