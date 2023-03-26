const express = require("express");
const { authenticator } = require("../middlewares/auth.middleware");
const { TodoModel } = require("../models/notes.model");

const todoRouter = express.Router();


todoRouter.post("/addtask",authenticator, async(req,res)=>{
    const {title,description,start,end,userID} = req.body
    try {
        const newTask = new TodoModel({title,description,start,end,userID});
        await newTask.save();
        res.status(201).send({msg:"New task created successfully"})
    } catch (error) {
        res.status(200).send({msg:error.message})
    }
});

todoRouter.get("/",authenticator, async(req,res)=>{
    try {
        const tasks = await TodoModel.find({userID:req.body.userID});
        if(tasks.length>0){
            res.status(200).send(tasks)
        }
        else{
            res.status(404).send({msg:"No tasks found, please create one"})
        }
    } catch (error) {
        res.status(400).send({msg:error.message})
    }
});

//Updating tasks
todoRouter.patch("/update/:id",authenticator, async (req,res)=>{
    let id = req.params.id
      try {
        const updatedTask = await TodoModel.findByIdAndUpdate(id,req.body);
        res.status(202).send({msg:`Task with id ${id} has been updated`})
      } catch (error) {
        res.status(400).send({msg:error.message})
      }
})

//Delete task route
todoRouter.delete("/delete/:id",authenticator, async (req,res)=>{
    let id = req.params.id
      try {
        const deleteTask = await TodoModel.findByIdAndDelete(id);
        res.status(202).send({msg:`Task with id ${id} has been deleted`})
      } catch (error) {
        res.status(400).send({msg:error.message})
      }
})



module.exports = {todoRouter}
