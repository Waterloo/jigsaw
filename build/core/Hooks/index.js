"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _HookSystem_hooks;
Object.defineProperty(exports, "__esModule", { value: true });
exports.HookSystem = void 0;
const chalk_1 = __importDefault(require("chalk"));
class HookSystem {
    constructor() {
        _HookSystem_hooks.set(this, new Map());
    }
    addHook(hookName, callback) {
        //check if hook exists
        if (!__classPrivateFieldGet(this, _HookSystem_hooks, "f").has(hookName)) {
            __classPrivateFieldGet(this, _HookSystem_hooks, "f").set(hookName, new Set());
        }
        __classPrivateFieldGet(this, _HookSystem_hooks, "f").get(hookName).add(callback);
    }
    dispatchHook(hookName, data = undefined) {
        var _a, _b;
        if (__classPrivateFieldGet(this, _HookSystem_hooks, "f").has(hookName)) {
            __classPrivateFieldGet(this, _HookSystem_hooks, "f").get(hookName).forEach(callback => {
                callback.call({}, data);
            });
        }
        if (hookName !== "*") {
            let stack = (_a = (new Error()).stack) === null || _a === void 0 ? void 0 : _a.split("\n");
            const optimizedStack = (_b = stack === null || stack === void 0 ? void 0 : stack.slice(0, stack.length - 4)) === null || _b === void 0 ? void 0 : _b.join("\n").trim().replace("at ", "").replace("Error:", "");
            if (optimizedStack && optimizedStack !== "Error")
                console.log(`${chalk_1.default.bgBlue(hookName)} dispatched from`, chalk_1.default.green(optimizedStack));
            this.dispatchHook("*", data);
        }
    }
    listHooks() {
        return [...__classPrivateFieldGet(this, _HookSystem_hooks, "f").keys()];
    }
}
exports.HookSystem = HookSystem;
_HookSystem_hooks = new WeakMap();
exports.default = new HookSystem();
