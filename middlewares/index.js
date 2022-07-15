const { verifyJWT } = require("../helpers/jwt")

const validateSignup = (req,res,next)=>{
    const {name,email,password} = req.body
    if(!name || !email || !password) return res.send("Invalid Fields")
    next()
}

const validateLogin = (req,res,next)=>{
    const {email,password} = req.body
    if(!email || !password) return res.send("Invalid credentials")
    next()
}

const Authorized = (req,res,next)=>{
    const token = req.headers['auth']
    if(verifyJWT(token)) return next()
    else res.send("Access denied")
}



module.exports = {
    validateSignup,
    validateLogin,
    Authorized
}
