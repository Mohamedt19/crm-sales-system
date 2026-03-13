import express from "express";
import auth from "../middleware/auth.js";
import validate from "../middleware/validate.js";
import {
  createLeadSchema,
  updateLeadSchema,
} from "../validators/leadSchemas.js";
import {
  postLead,
  getLeads,
  getLead,
  patchLead,
  removeLead,
} from "../controllers/leadController.js";

const router = express.Router();

router.get("/", auth, getLeads);
router.post("/", auth, validate(createLeadSchema), postLead);
router.get("/:id", auth, getLead);
router.patch("/:id", auth, validate(updateLeadSchema), patchLead);
router.delete("/:id", auth, removeLead);

export default router;