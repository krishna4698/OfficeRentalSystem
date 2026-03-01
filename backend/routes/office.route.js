import express from "express"
import { createoffice, getalloffices } from "../modules/ofiices/office.controller.js";
import { authmiddleware } from "../middleware/auth.middleware.js";
import { rolemiddleware } from "../middleware/role.middleware.js";

  const router= express.Router();

router.post("/create",authmiddleware,rolemiddleware("admin","superadmin"),createoffice)
router.get("/getoffices",authmiddleware, rolemiddleware("admin","company", "superadmin"), getalloffices)


export default router
