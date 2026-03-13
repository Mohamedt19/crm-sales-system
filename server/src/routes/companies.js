import express from "express";
import auth from "../middleware/auth.js";
import validate from "../middleware/validate.js";
import {
  createCompanySchema,
  updateCompanySchema,
} from "../validators/companySchemas.js";
import {
  postCompany,
  getCompanies,
  getCompany,
  patchCompany,
  removeCompany,
} from "../controllers/companyController.js";

const router = express.Router();

router.get("/", auth, getCompanies);
router.post("/", auth, validate(createCompanySchema), postCompany);
router.get("/:id", auth, getCompany);
router.patch("/:id", auth, validate(updateCompanySchema), patchCompany);
router.delete("/:id", auth, removeCompany);

export default router;