declare global {
interface Hooks {
    addHook(hookName: string, callback: (data: any) => void): void;
    dispatchHook(hookName: string, data?: any): void;
    listHooks(): string[];
}
}

export { };