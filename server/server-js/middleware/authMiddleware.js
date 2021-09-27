"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        try {
            const decodedToken = jsonwebtoken_1.default.verify(token, 'super duper secret password');
            console.log(decodedToken);
            res.locals.user = decodedToken;
            next();
        }
        catch (error) {
            console.log(error);
        }
    }
    else {
        console.log('not carrying verified jwt');
    }
};
exports.requireAuth = requireAuth;
// jwt.verify(token, 'super duper secret password', (err, decodedToken) => {
//   if (err) {
//     console.log(err.message);
//   } else {
//     console.log(decodedToken)
//     next();
//   }
// })
