const jwt = require("jsonwebtoken")

const authenticate=(req,res,next)=>{
    const token = req.headers.authorization
if(token){
    const decoded = jwt.verify(token,"masai")
    if(decoded){
     next()
    }else{
        res.json({"message":"please Login"})
    }
}else{
    res.json({"message": "Please Login"})
}
}
module.exports = {authenticate}