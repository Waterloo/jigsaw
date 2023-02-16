"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("./core");
async function bootstrap() {
    core_1.Utils.exposeGlobal("Hooks", core_1.Hooks);
    (await core_1.Plugin.scanForPlugins()).forEach(plugin => {
        core_1.Plugin.registerPlugin(plugin);
        core_1.Plugin.initializePlugin(plugin);
    });
    core_1.Hooks.dispatchHook("initialize", "data is");
}
bootstrap();
