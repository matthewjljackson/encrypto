"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDb = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const connectDb = () => {
    try {
        console.log('connecting to mongoose');
        return mongoose_1.default.connect('mongodb://localhost:27017/encrypto');
    }
    catch (error) {
        console.log(error);
    }
};
exports.connectDb = connectDb;
