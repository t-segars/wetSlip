import express from "express";
import {
  createSlip,
  deleteSlip,
  getSlip,
  getSlips,
  updateSlip,
  updateSlipAvailability,
} from "../controllers/slip.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();
//CREATE
router.post("/:dockid", verifyAdmin, createSlip);

//UPDATE
router.put("/availability/:id", updateSlipAvailability);
router.put("/:id", verifyAdmin, updateSlip);
//DELETE
router.delete("/:id/:dockid", verifyAdmin, deleteSlip);
//GET

router.get("/:id", getSlip);
//GET ALL

router.get("/", getSlips);

export default router;