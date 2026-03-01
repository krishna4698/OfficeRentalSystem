import express from "express"
import {register, login, me, Logout, googleAuth} from "../modules/auth/auth.controller.js";
import { authmiddleware } from "../middleware/auth.middleware.js";
import { rolemiddleware } from "../middleware/role.middleware.js";
// import { createoffice } from "../modules/Building/ofiices/office.controller.js";

// import { Router } from "express";
const router= express.Router();


router.post("/register", register)
router.post("/login", login )
router.get("/me", authmiddleware, me)
router.post("/logout", Logout)
router.post("/google", googleAuth)


export default router;