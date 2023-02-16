"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exposeGlobal = void 0;
function exposeGlobal(name, value) {
    Object.defineProperty(global, name, {
        value,
        configurable: false,
        writable: false
    });
}
exports.exposeGlobal = exposeGlobal;
