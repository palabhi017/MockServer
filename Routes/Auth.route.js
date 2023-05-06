const {userModel} = require("../Models/userModel")
const express = require("express")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const userRouter = express.Router()

userRouter.post("/ragister", async(req,res)=>{
const {name,email,password,isAdmin} = req.body;

const user = await userModel.find({email})

if(user.length>0){
    res.send({msg:"user already exits,Please Login"})
}else{
    bcrypt.hash(password,5, async(err,hash)=>{
        const user = new userModel({name,email,password,isAdmin})
        await user.save()
})
res.status(201).send({"message":"user ragistered successfully"})
}

})

userRouter.post("/login",async(req,res)=>{

    const {email,password}= req.body;

    try {
        const user = await userModel.find({email})

        if(user.length>0){
            bcrypt.compare(password, user[0].password,(err,result)=>{
                if(result){
                    const token = jwt.sign({masai:"mock11"},"masai")
                  res.send({"msg":"Login Successfull","token":token})
                }else{
                    res.send("wrong details")
                }
            })
        }else{
            res.send("wrong details")
        }
    } catch (error) {
        res.send("something went wrong")
    }
})

module.exports={userRouter}