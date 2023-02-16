"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = require("../../core/index");
const app = (0, express_1.default)();
app.get("/", (req, res) => {
    res.json("Server Started");
});
app.listen(9001, function loaded() {
    console.log("listening on 9001");
    index_1.Hooks.dispatchHook("server:started", app);
});
