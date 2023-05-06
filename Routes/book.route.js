const { authenticate } = require("../Middlewares/auth.middleware")
const {bookModel} = require("../Models/Bookmodel")
const express = require("express")
const bookRouter = express.Router()

bookRouter.use(authenticate)

bookRouter.get("/",async(req,res)=>{

    try {
        let books = await bookModel.find()
        res.status(200).json({"data":books})
    } catch (error) {
        res.send(error)
    }
})

bookRouter.get("/:id",async(req,res)=>{
let id = req.params.id;
    try {
        let book = await bookModel.find({id})
        res.status(200).json({"data":book})
    } catch (error) {
        res.send(error)
    }
})


bookRouter.get("/",async(req,res)=>{
    
        try {
            const q = {}
  
            if(req.query.author){
                q.author= req.query.author
            }
            if(req.query.category){
                q.category= req.query.category
            }
          
        const book = await bookModel.find(q)
        
        res.status(200).json({"books":book})
        } catch (error) {
            res.send(error)
        }
    })

bookRouter.post("/add",async(req,res)=>{
    
            try {
                await bookModel.insertMany(req.body)
    
    res.status(200).json({"msg":"book added successfully"})
            } catch (error) {
                res.send(error)
            }
})

bookRouter.delete("/delete/:id",async(req,res)=>{
    const id = req.params.id
        try {
           await bookModel.findByIdAndDelete(id)
           res.status(200).json({"msg":"Book deleted successfully"})
        } catch (err) {
            res.status(400).json({"err":"bad request"})
        }
    
})

bookRouter.patch("/update/:id",async(req,res)=>{

    const id = req.params.id
    const data = req.body
try {
     await bookModel.findByIdAndUpdate({_id:id},data)
    res.status(200).json({"massage":"Book Updated successfully"})
} catch (error) {
    res.status(400).json({"err":"bad request"})
}
})

module.exports={bookRouter}