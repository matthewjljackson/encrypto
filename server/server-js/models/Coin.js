"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Coin = void 0;
const mongoose_1 = require("mongoose");
const coinSchema = new mongoose_1.Schema({
    owner: { type: mongoose_1.Schema.Types.ObjectId, ref: 'user', required: true },
    symbol: { type: String, required: true },
    openPrice: { type: String, required: true }
});
exports.Coin = mongoose_1.model('coin', coinSchema);
