import express from "express"
import { Hooks } from "../../core/index"

const app = express()
app.get("/", (req,res) => {

res.json("Server Started")

})
app.listen(9001, function loaded(){
    console.log("listening on 9001")
    Hooks.dispatchHook("server:started", app)
})