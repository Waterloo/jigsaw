import { Plugin, Hooks , Utils } from "./core"
import * as winston from "winston"

async function bootstrap() {
    Utils.exposeGlobal("Hooks", Hooks);
    

    (await Plugin.scanForPlugins()).forEach(plugin => {
        Plugin.registerPlugin(plugin)
        Plugin.initializePlugin(plugin)
    })
    Hooks.dispatchHook("initialize", "data is")
}

bootstrap()
