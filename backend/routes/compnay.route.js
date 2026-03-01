import express from "express"
import {addCompany, alloffices, getmyBookings, myCompany} from "../modules/company/company.controlller.js"
import { authmiddleware } from "../middleware/auth.middleware.js";
import { rolemiddleware } from "../middleware/role.middleware.js";

const router= express.Router();

router.post("/addCompany",  authmiddleware, rolemiddleware("company"), addCompany)
router.get("/mycompany", authmiddleware, rolemiddleware("company"), myCompany)
router.get("/alloffices", authmiddleware, alloffices)
router.get("/getmybookings", authmiddleware, rolemiddleware("company"), getmyBookings)

export default router;

