import express from "express"
import { getallcompanies } from "../modules/superadmin/companies.controller.js";
import { authmiddleware } from "../middleware/auth.middleware.js";
import { rolemiddleware } from "../middleware/role.middleware.js";

const router= express.Router();


router.get("/allcompanies", authmiddleware,  rolemiddleware("superadmin"), getallcompanies)

export default router;