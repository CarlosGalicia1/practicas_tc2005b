const express = require('express');
const router = express.Router();
const path = require('path');
const passwordcontroller = require('../controllers/GeneratePasswordController');

router.post('^/Generatepassword(.html)?', passwordcontroller.post);

module.exports = router;