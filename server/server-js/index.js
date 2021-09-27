"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { connectDb } = require('./models/index');
const { router } = require('./routes/authRoutes');
const app = express_1.default();
const PORT = 3001;
app.use(express_1.default.json());
app.use(cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
    secure: false
}));
app.use(cookieParser());
app.use(router);
connectDb().then(() => {
    app.listen(PORT, () => {
        console.log(`express running on port: ${PORT}`);
    });
});
