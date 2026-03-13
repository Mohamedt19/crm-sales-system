import express from "express";
import auth from "../middleware/auth.js";
import validate from "../middleware/validate.js";
import { createNoteSchema } from "../validators/noteSchemas.js";
import { postNote, getNotes } from "../controllers/noteController.js";

const router = express.Router();

router.get("/:id/notes", auth, getNotes);
router.post("/:id/notes", auth, validate(createNoteSchema), postNote);

export default router;