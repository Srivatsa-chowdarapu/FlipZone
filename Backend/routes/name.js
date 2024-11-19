import express from "express";
import { createName, deleteName, getNameById, getName, updateName, getNames, Checkout} from "../controllers/name.js";
import { verifyAdmin } from "../utils/verifytoken.js";


const router = express.Router();

//Create
router.post("/", createName)
//Update
router.put("/:id", updateName)
//Delete
router.delete("/:id",verifyAdmin, deleteName)

router.post('/checkout', Checkout)
// Get by ID 
router.get("/id/:id", getNameById);
// Get by type
router.get("/type/:type", getName);

// //Get all
router.get("/", getNames)

export default router