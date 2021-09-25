"use strict";
const { Router } = require('express');
const { registerPost, loginPost } = require('../controllers/authController');
const router = Router();
router.post('/signup', registerPost);
router.post('/login', loginPost);
module.exports = { router };
