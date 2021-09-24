"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Router } = require('express');
const authController = require('../controllers/authController');
const router = Router();
router.get('/ass', (req, res) => {
    const token = req.cookies.jwt;
    console.log(token);
    res.send();
});
router.get('/signup', authController.signup_get);
router.post('/signup', authController.signup_post);
router.get('/login', authController.login_get);
router.post('/login', authController.login_post);
module.exports = { router };
