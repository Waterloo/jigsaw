function exposeGlobal(name: string, value: any) {
    Object.defineProperty(global, name, {
        value,
        configurable: false,
        writable: false
    })
}


export {exposeGlobal}