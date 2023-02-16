declare class HookSystem {
    #private;
    addHook(hookName: string, callback: (data: any) => void): void;
    dispatchHook(hookName: string, data?: any): void;
    listHooks(): string[];
}
declare const _default: HookSystem;
export default _default;
export { HookSystem };
