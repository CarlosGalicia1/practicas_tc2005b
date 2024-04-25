const express = require('express');
const router = express.Router();
const path = require('path');
const userconttroller = require('../controllers/UserController');

router.get('^/getUsers', userconttroller.getUsers);
router.get('^/register', userconttroller.get);
router.post('^/register', userconttroller.insertUser);
router.get('^/Users/:user_id', userconttroller.getUser);

module.exports = router;