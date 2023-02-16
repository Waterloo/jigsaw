"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET = void 0;
const express_1 = require("express");
const route = (0, express_1.Router)();
function GET(path = "/") {
    return (target, memberName, propertyDescriptor) => {
        const method = propertyDescriptor.value;
        propertyDescriptor.value = function (...args) {
            return console.log(method.apply(target, args));
        };
        return propertyDescriptor;
    };
}
exports.GET = GET;
