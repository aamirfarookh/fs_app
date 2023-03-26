 const jwt = require("jsonwebtoken")
 
 
 const authenticator = async (req,res,next)=>{
    let token = req.headers.authorization;
    try {
        let decoded = jwt.verify(token,"masai");
        if(decoded){
            req.body.userID =decoded.userID
            next();
        }
        else{
            res.status(400).send({msg:"Please login first"})
        } 
    } catch (error) {
        res.status(400).send({msg:error.message})
    }
  
 };


 module.exports ={authenticator}