import express from "express";
import {
  countByCity,
  countByType,
  createDock,
  deleteDock,
  getDock,
  getDockSlips,
  getDocks,
  updateDock,
} from "../controllers/dock.js";
import Dock from "../models/Dock.js";
import {verifyAdmin} from "../utils/verifyToken.js"
const router = express.Router();

//CREATE
router.post("/", verifyAdmin, createDock);

//UPDATE
router.put("/:id", verifyAdmin, updateDock);
//DELETE
router.delete("/:id", verifyAdmin, deleteDock);
//GET

router.get("/find/:id", getDock);
//GET ALL

router.get("/", getDocks);
router.get("/countByCity", countByCity);
router.get("/countByType", countByType);
router.get("/slip/:id", getDockSlips);

export default router;