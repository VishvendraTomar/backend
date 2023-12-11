const express = require("express");
const cors = require("cors");
const {connection} = require("./config/db");
const { userRouter } = require("./routes/user.route");
const {auth} = require("./middleware/auth.middleware")
const { postRouter } = require("./routes/post.route");
require("dotenv").config();


const app = express()

app.use(express.json());
app.use(cors())

// app.use("./users",userRouter)
app.use("/users", userRouter)
app.use("/posts", auth,postRouter)

app.listen(process.env.PORT, async()=>{
    try{
        await connection;
        console.log("Db connected");

    }catch(error){
        console.log(error.message);
    }
})