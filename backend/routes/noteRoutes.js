import express from "express";

import {
  getNotes,
  getNote,
  createNote,
  updateNote,
  deleteNote,
  toggleNote,
} from "../controllers/noteController.js";

const router = express.Router();

router.get("/", getNotes);

router.get("/:id", getNote);

router.post("/", createNote);

router.put("/:id", updateNote);

router.delete("/:id", deleteNote);

router.patch("/:id/toggle", toggleNote);

export default router;