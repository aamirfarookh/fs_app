const express = require("express");
const { connection } = require("./dbConnect");
const { todoRouter } = require("./routes/todo.route");
const {userRouter} = require("./routes/user.routes")
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors())

app.use("/users",userRouter)
app.use("/todos",todoRouter)

//Running the server and connecting to DB
app.listen(4500, async()=>{
    try {
        await connection;
        console.log("Connected to DB")
    } catch (error) {
        console.log(error.message,error.name)
    }
 console.log("Server is running on port 4500")
})