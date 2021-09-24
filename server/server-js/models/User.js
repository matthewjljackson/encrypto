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
const mongoose_1 = require("mongoose");
const bcrypt = require('bcrypt');
const userSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: [true, 'Please enter a username'],
        unique: true,
        // lowercase: true
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [6, 'Minimum password length is 6 characters']
    }
});
// fire a function before doc saved to db
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const salt = yield bcrypt.genSalt();
        this.password = yield bcrypt.hash(this.password, salt);
        next();
    });
});
// static method to login user
userSchema.statics.login = function (username, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield this.findOne({ username });
        if (user) {
            const auth = yield bcrypt.compare(password, user.password);
            if (auth) {
                return user;
            }
            throw Error('incorrect password');
        }
        throw Error('that username does not exist');
    });
};
const User = mongoose_1.model('user', userSchema);
module.exports = User;
