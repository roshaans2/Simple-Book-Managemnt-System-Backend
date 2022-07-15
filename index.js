const express = require("express")
const shortid = require("shortid")
const bmRoutes = require("./routes/bm")
const authRoutes = require("./routes/auth")

const app = express()

app.use(express.json())

app.use("/bms",bmRoutes)
app.use("/auth",authRoutes)

app.listen(4000,()=>{
    console.log("Server Started")
})