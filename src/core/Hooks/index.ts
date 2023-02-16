import chalk from 'chalk';

class HookSystem {
    #hooks = new Map<string, Set<(data:any) => void>>()
    addHook(hookName: string, callback: (data:any) => void){
        //check if hook exists
        if(!this.#hooks.has(hookName)){
            this.#hooks.set(hookName, new Set<(data:any) => void>())
        }
        this.#hooks.get(hookName)!.add(callback)
    }

    dispatchHook(hookName: string, data: any = undefined){
        
        if(this.#hooks.has(hookName)){
            this.#hooks.get(hookName)!.forEach(callback => {
                callback.call({}, data)
            })
        }
        if(hookName !== "*"){
            let stack = (new Error()).stack?.split("\n");
            const optimizedStack =  stack?.slice(0,stack.length - 4)?.join("\n").trim().replace("at ", "").replace("Error:","")
            if(optimizedStack && optimizedStack !== "Error")
            console.log(`${chalk.bgBlue(hookName)} dispatched from`, chalk.green(optimizedStack))
            this.dispatchHook("*", data)
        }
    }

    listHooks(){
        return [...this.#hooks.keys()]
    }
}

export default new HookSystem()
export {HookSystem}