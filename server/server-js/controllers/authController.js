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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.coinsDelete = exports.coinsPost = exports.coinsGet = exports.loginPost = exports.registerPost = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../models/User");
const User_2 = require("../models/User");
const bcrypt = require('bcrypt');
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
    return jsonwebtoken_1.default.sign({ id }, 'super duper secret password', {
        expiresIn: maxAge // expects time in seconds
    });
};
const registerPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('register post request');
    const { username, password } = req.body;
    try {
        const user = yield User_1.User.create({ username, password });
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(201).json({ id: user._id, username: user.username });
    }
    catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
});
exports.registerPost = registerPost;
const loginPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('login post request');
    const { username, password } = req.body;
    console.log(password);
    try {
        const user = yield User_1.User.login(username, password);
        const token = createToken(user._id);
        console.log(token, user._id);
        res.cookie('jwt', token, { httpOnly: true, secure: false, sameSite: 'strict', maxAge: maxAge * 1000 });
        res.status(200).json({ id: user._id, username: user.username });
    }
    catch (error) {
        const errors = handleErrors(error);
        res.status(400).json({ errors });
    }
});
exports.loginPost = loginPost;
const coinsGet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('coin getting');
    try {
        const user = yield User_1.User.findById({ _id: res.locals.user.id }).populate('coins');
        console.log(user.coins[0].openPrice);
        res.status(200);
        if (user) {
            res.json(user.coins);
        }
        else {
            res.json({ error: "couldn't find coins" });
        }
    }
    catch (error) {
        const errors = handleErrors(error);
        res.status(400).json({ errors });
    }
});
exports.coinsGet = coinsGet;
const coinsPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('coin posting');
    const { symbol, openPrice, quantity, startDate } = req.body;
    try {
        const owner = yield User_1.User.findById(res.locals.user.id);
        const addCoin = yield User_2.Coin.create({ owner: owner._id, symbol: symbol.toUpperCase(), openPrice, quantity, timestamp: startDate });
        const addCoinsToUser = yield owner.coins.push(addCoin._id);
        yield owner.save();
        res.status(200).json({ status: 'coins added' });
    }
    catch (error) {
        const errors = handleErrors(error);
        res.status(400).json({ errors });
    }
});
exports.coinsPost = coinsPost;
const coinsDelete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('coin deleting');
    const { _id } = req.body;
    try {
        const owner = yield User_1.User.findById(res.locals.user.id);
        const coinDoc = yield User_2.Coin.deleteOne({ _id });
        yield owner.coins.pull({ _id });
        yield owner.save();
        res.status(200).json({ status: 'coins deleted' });
    }
    catch (error) {
        const errors = handleErrors(error);
        res.status(400).json({ errors });
    }
});
exports.coinsDelete = coinsDelete;
