import express from "express"
import {Bookings, getMyBuildings, registerBuilding } from "../modules/Building/building.controller.js";
import { authmiddleware } from "../middleware/auth.middleware.js";
import { rolemiddleware } from "../middleware/role.middleware.js";


const router= express.Router();

router.post("/registerBuilding", authmiddleware,rolemiddleware("admin", "superadmin"), registerBuilding)

router.get("/getmybuildings", authmiddleware,  getMyBuildings)
router.get("/getbookings",  authmiddleware, rolemiddleware("admin"), Bookings)

export default router