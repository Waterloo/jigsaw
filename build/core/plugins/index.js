"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializePlugin = exports.scanForPlugins = exports.listPlugin = exports.registerPlugin = exports.registerMenu = exports.executeHook = exports.registerHook = void 0;
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const plugins = new Map();
const hooks = new Map();
const menu = new Map();
function registerHook(eventName, callback) {
    if (hooks.has(eventName)) {
        hooks.get(eventName).push(callback);
    }
    else {
        hooks.set(eventName, [callback]);
    }
}
exports.registerHook = registerHook;
function executeHook(eventName, data) {
    const callbacks = hooks.get(eventName);
    if (callbacks) {
        callbacks.forEach((callback) => {
            callback(data);
        });
    }
}
exports.executeHook = executeHook;
function registerMenu(namespace, item) {
    menu.set(namespace, item);
}
exports.registerMenu = registerMenu;
function registerPlugin(definition) {
    plugins.set(definition.uri, definition);
}
exports.registerPlugin = registerPlugin;
function listPlugin() {
    return structuredClone(plugins);
}
exports.listPlugin = listPlugin;
async function scanForPlugins(pluginDirPath = '') {
    const pluginsPath = pluginDirPath || path_1.default.join(__dirname, '../../plugins');
    const pluginsList = await fs_1.promises.readdir(pluginsPath);
    const plugins = [];
    const promises = pluginsList.map(async (plugin) => {
        try {
            const manifestPath = path_1.default.join(pluginsPath, plugin, 'manifest.json');
            const manifestData = await import(manifestPath);
            // console.log(manifestData.default)
            plugins.push(manifestData.default);
        }
        catch (error) {
            throw new Error("Error Occurred");
        }
    });
    (await Promise.allSettled(promises));
    return plugins;
}
exports.scanForPlugins = scanForPlugins;
async function initializePlugin(plugin) {
    const pluginsPath = path_1.default.join(__dirname, `../../plugins/${plugin.uri}/${plugin.entry || "index.ts"}`);
    const pluginScript = (await import(pluginsPath));
}
exports.initializePlugin = initializePlugin;
