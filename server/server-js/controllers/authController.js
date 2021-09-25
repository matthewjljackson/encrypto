"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const User = require("../models/User");
const jwt = require('jsonwebtoken');
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { username: '', password: '' };
    // register username error
    if (err.code === 11000) {
        errors.username = 'that username is already registered';
    }
    // validation errors
    if (err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }
    //handle login errors here
    if (err.message === 'incorrect password') {
        errors.password = 'incorrect password';
    }
    ;
    if (err.message === 'that username does not exist') {
        errors.username = 'that username does not exist';
    }
    return errors;
};
const maxAge = 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, 'super duper secret password', {
        expiresIn: maxAge // expects time in seconds
    });
};
const registerPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('register post request');
    const { username, password } = req.body;
    try {
        const user = yield User.create({ username, password });
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(201).json({ id: user._id, username: user.username });
    }
    catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
});
const loginPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('login post request');
    const { username, password } = req.body;
    try {
        const user = yield User.login(username, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(200).json({ id: user._id, username: user.username });
    }
    catch (error) {
        const errors = handleErrors(error);
        res.status(400).json({ errors });
    }
});
module.exports = {
    loginPost,
    registerPost
};
