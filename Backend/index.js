import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import typeRoute from "./routes/types.js";
import authRoute from "./routes/auth.js";
import cookieParser from "cookie-parser";
import usersRoute from "./routes/users.js";
import nameRoute from "./routes/name.js";
// import cors from "cors";

const app = express()
dotenv.config()

const connect = async () => {
try {
    await mongoose.connect(process.env.MANGO);
    console.log("Connected to MongoDB");
  } catch (error) {
    throw error
  }
};

mongoose.connection.on("disconnected", () => {
    console.log("Disconnected from MongoDB");
})

//middleware
app.use(cookieParser());
app.use(express.json({ limit: "40mb" })); 
app.use(express.urlencoded({ limit: "40mb", extended: true }));

app.use("/types" , typeRoute);
app.use("/auth" , authRoute);
app.use("/users" , usersRoute);
app.use("/name" , nameRoute);

app.use((err,req,res,next)=>{
  const errorStatus = err.status || 500
  const errorMessage = err.message || "Somthing went wrong!"
  return res.status(errorStatus).json({
    success:false,
    status:errorStatus,
    message:errorMessage,
    stack:err.stack
  })
})

app.listen(8000 , () =>{
    connect()
    console.log('server is running on port 8000')
})

