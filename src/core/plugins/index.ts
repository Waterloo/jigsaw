import { MenuItem, Plugin } from "../../utils/types/index";
import { promises as fs } from "fs";
import path from 'path'

const plugins = new Map<string, Plugin>()
const hooks = new Map<string, Array<(data: unknown) => void>>();
const menu = new Map<string, MenuItem>()


function registerHook(eventName: string, callback: (data: unknown) => void) {
  if (hooks.has(eventName)) {
    hooks.get(eventName)!.push(callback);
  } else {
    hooks.set(eventName, [callback]);
  }
}

function executeHook(eventName: string, data: unknown) {
  const callbacks = hooks.get(eventName);
  if (callbacks) {
    callbacks.forEach((callback) => {
      callback(data);
    });
  }
}

function registerMenu(namespace: string, item: MenuItem) {
  menu.set(namespace, item)
}

function registerPlugin(definition: Plugin) {
  plugins.set(definition.uri, definition)
}

function listPlugin(){
  return structuredClone(plugins)
}

async function scanForPlugins(pluginDirPath:string = ''){
  const pluginsPath = pluginDirPath || path.join(__dirname, '../../plugins')
  const pluginsList = await fs.readdir(pluginsPath)
  const plugins: Plugin[] = []

  const promises = pluginsList.map(async (plugin) => {
      try {
          const manifestPath = path.join(pluginsPath, plugin, 'manifest.json')
          const manifestData = await import(manifestPath)
          // console.log(manifestData.default)
          plugins.push(manifestData.default)
      }
      catch(error){
          throw new Error("Error Occurred")
      }
})

;(await Promise.allSettled(promises))
return plugins
}

async function initializePlugin(plugin: Plugin) {
  const pluginsPath = path.join(__dirname, `../../plugins/${plugin.uri}/${plugin.entry || "index.ts"}`)
  const pluginScript = (await import(pluginsPath))
}

export { registerHook, executeHook, registerMenu, registerPlugin, listPlugin, scanForPlugins,initializePlugin };
