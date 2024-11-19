import express from "express";
import { createType, deleteType, getType, getTypes, updateType } from "../controllers/type.js";
import { verifyAdmin } from "../utils/verifytoken.js";

const router = express.Router();

//Create
router.post("/",verifyAdmin, createType)
//Update
router.put("/:id",verifyAdmin, updateType)
//Delete
router.delete("/:id",verifyAdmin, deleteType)
//Get
router.get("/find/:id", getType)
//Get all
router.get("/", getTypes)

export default router;