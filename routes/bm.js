const router = require("express").Router()
const fs = require("fs")
const path = require("path")
const {Authorized} = require("../middlewares/index")

router.get("/",Authorized,(req,res)=>{
    const data = JSON.parse(fs.readFileSync(path.join(path.resolve(),"book.json"),{encoding:"UTF-8"}))
    res.send(data)
})

router.get("/:isbn",(req,res)=>{
    const {isbn} = req.params
    const data = JSON.parse(fs.readFileSync(path.join(path.resolve(),"book.json"),{encoding:"UTF-8"}))
    res.send(data.find(item=>item.isbn==isbn))

})

router.post("/",(req,res)=>{
    try{
        const data = req.body
        const books = JSON.parse(fs.readFileSync(path.join(path.resolve(),"book.json"),{encoding:"UTF-8"}))
    
        const book = {
            ...data,
        }
        books.push(book)
        fs.writeFileSync(path.join(path.resolve(),"book.json"),JSON.stringify(books))
    
        res.send(book)
    }
    catch(error){
        console.log(error)
        res.send(error.message)
    }


})

router.delete("/:isbn",(req,res)=>{
    try{
        const {isbn} = req.params
        const books = JSON.parse(fs.readFileSync(path.join(path.resolve(),"book.json"),{encoding:"UTF-8"}))
    
        const newBooks = books.filter(book=>book.isbn!=isbn)

        fs.writeFileSync(path.join(path.resolve(),"book.json"),JSON.stringify(newBooks))
    
        res.send(newBooks)
    }
    catch(error){
        console.log(error)
        res.send(error.message)
    }


})

module.exports = router