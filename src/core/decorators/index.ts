import { Router } from "express"
const route = Router()

export function GET(path:string = "/"){
    
    return (target: any, memberName: string, propertyDescriptor: PropertyDescriptor) => {
        const method = propertyDescriptor.value
        propertyDescriptor.value = function (...args: any){
        return console.log(method.apply(target, args))
        }
        return propertyDescriptor
    }
}

