const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
    title:String,
    description:String,
    start:String,
    end:String,
    userID:String
});

const TodoModel = mongoose.model("todo",todoSchema);


module.exports = {TodoModel}