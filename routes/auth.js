const express = require("express")
const fs = require("fs")
const path = require("path")
const { v4: uuidv4} = require("uuid")
const {validateSignup,validateLogin} = require("../middlewares/index")
const router = express.Router()
const { createJWT } = require("../helpers/jwt")

router.post("/signup",validateSignup,(req,res)=>{
    try
    {
        const {name,email,password} = req.body
        const users = JSON.parse(fs.readFileSync(path.join(path.resolve(),"users.json"),{encoding:"UTF-8"}))
        
        const user = {
            name,email,password,
            id:uuidv4(),
        }
        users.push(user)
        fs.writeFileSync(path.join(path.resolve(),"users.json"),JSON.stringify(users))
    
        res.send(user)

    }
    catch(error){
        console.log(error.message)
    }
})

router.post("/login",validateLogin,(req,res)=>{
    try
    {
        const {email,password} = req.body
        const users = JSON.parse(fs.readFileSync(path.join(path.resolve(),"users.json"),{encoding:"UTF-8"}))
        
        const user = users.find(user=>user.email==email)
        if(!user) return res.send("User not found")
        if(user.password!=password) return res.send("Incorect password")


        
    
        res.json({
            token:createJWT({id:user.id,email:user.email})
        })

    }
    catch(error){
        console.log(error.message)
    }
})






module.exports = router