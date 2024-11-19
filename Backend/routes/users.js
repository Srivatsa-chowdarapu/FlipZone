import express from "express";
import { deleteUser, getUser, getUsers, updateUser } from "../controllers/user.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifytoken.js";

const router = express.Router();

// router.get("/checkauthentication", verifyToken,(req,res,next)=>{
//     res.send("Hello User, you are authenticated")
// })

// router.get("/checkuser/:id", verifyUser,(req,res,next)=>{
//     res.send("Hello User, you are authenticated and you can delete your account")
// })

// router.get("/checkadmin/:id", verifyAdmin,(req,res,next)=>{
//     res.send("Hello Admin, you are authenticated and you can delete all account")
// })

//Update
router.put("/:id",verifyUser, updateUser)
//Delete
router.delete("/:id",verifyUser, deleteUser)
//Get
router.get("/:id",verifyUser, getUser)
//Get all
router.get("/",verifyAdmin, getUsers)

export default router