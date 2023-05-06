const { authenticate } = require("../Middlewares/auth.middleware")
const {orderModel} = require("../Models/Ordermodel")
const express = require("express")
const orderRouter = express.Router()

orderRouter.use(authenticate)
orderRouter.get("/",async(req,res)=>{

    try {
        let orders = await orderModel.find()
        res.status(200).json({"data":orders})
    } catch (error) {
        res.send(error)
    }
})



orderRouter.post("/add",async(req,res)=>{
    
        try {
            await orderModel.insertMany(req.body)

res.status(200).json({"msg":"order added successfully"})
        } catch (error) {
            res.send(error)
        }
})

module.exports={orderRouter}