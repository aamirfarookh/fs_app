const express = require("express");
const bcrypt = require("bcrypt");
const { UserModel } = require("../models/user.model");
const userRouter = express.Router();
const jwt = require("jsonwebtoken")

//registration route with password hashing
userRouter.post("/register",(req,res)=>{
    const{username,email,password,address,age} = req.body
    try {
       bcrypt.hash(password,5, async (err,hash)=>{
        if(!err){
            const newUser = new UserModel({username,email,password:hash,address,age});
          await newUser.save();
          res.status(201).send({msg:"New user created successfully"})
        }
        else{
            res.status(400).send({err:err.message})
        }  
       }) 
    } catch (error) {
        res.status(400).send({error:error.message})
    }
});

//login route

userRouter.post("/login",async(req,res)=>{
    const {email,password} = req.body
    try {
        const user = await UserModel.findOne({email});
        if(user){
            bcrypt.compare(password,user.password,(err,result)=>{
                if(result){
                    res.status(200).send({msg:"Logged in Successfully",token: jwt.sign({userID:user._id},"masai",{ expiresIn: '1h' })})
                }
                else{
                    res.status(400).send({msg:"Wrong Credentials!!"})
                }
            })
        }
        else{
            res.status(404).send({msg:"No user found. Please register first"})
        }
    } catch (error) {
        res.status(400).send({msg:error.message})
    }
})

module.exports ={userRouter}