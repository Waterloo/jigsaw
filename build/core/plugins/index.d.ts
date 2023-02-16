import { MenuItem, Plugin } from "../../utils/types/index";
declare function registerHook(eventName: string, callback: (data: unknown) => void): void;
declare function executeHook(eventName: string, data: unknown): void;
declare function registerMenu(namespace: string, item: MenuItem): void;
declare function registerPlugin(definition: Plugin): void;
declare function listPlugin(): Map<string, Plugin>;
declare function scanForPlugins(pluginDirPath?: string): Promise<Plugin[]>;
declare function initializePlugin(plugin: Plugin): Promise<void>;
export { registerHook, executeHook, registerMenu, registerPlugin, listPlugin, scanForPlugins, initializePlugin };
