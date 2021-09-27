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
exports.User = exports.Coin = void 0;
const mongoose_1 = require("mongoose");
const bcrypt = require('bcrypt');
const userSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: [true, 'Please enter a username'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [6, 'Minimum password length is 6 characters']
    },
    coins: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'coin', required: false }]
});
// fire a function before doc saved to db
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.isModified('password'))
            return next();
        const salt = yield bcrypt.genSalt();
        this.password = yield bcrypt.hash(this.password, salt);
        const x = yield bcrypt.compare('codeworks', "$2b$10$jW3ZBPXU8fc2C103nZ4x.uKOcpGrxbZWADzDJ7/rKHt0IxC2qgPjS");
        console.log('hi', x);
        next();
    });
});
// static method to login user
// userSchema.statics.login = async function(username: string, password: string) {
//   const user = await this.findOne({ username });
//   if (user) {
//     const auth = await bcrypt.compare(password, user.password);
//     if (auth) {
//       return user;
//     }
//     throw Error('incorrect password')
//   }
//   throw Error('that username does not exist')
// }
userSchema.static('login', function (username, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield this.findOne({ username });
        console.log(user);
        if (user) {
            let auth = yield bcrypt.compare(password, user.password);
            // auth = true
            console.log(auth);
            if (auth) {
                return user;
            }
            throw Error('incorrect password');
        }
        throw Error('that username does not exist');
    });
});
const coinSchema = new mongoose_1.Schema({
    owner: { type: mongoose_1.Schema.Types.ObjectId, ref: 'user', required: true },
    symbol: { type: String, required: true },
    openPrice: { type: String, required: true },
    quantity: { type: Number, required: true },
    timestamp: { type: Number, required: true }
});
exports.Coin = mongoose_1.model('coin', coinSchema);
exports.User = mongoose_1.model('user', userSchema);
