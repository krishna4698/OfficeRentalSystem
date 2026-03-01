import express from "express"
import { createBookingRequest,  updateBookingStatus } from "../modules/booking/booking.controller.js";
import { rolemiddleware } from "../middleware/role.middleware.js";
import { authmiddleware } from "../middleware/auth.middleware.js";


const router= express.Router();
router.post("/create",authmiddleware,rolemiddleware("company"), createBookingRequest)
router.patch("/updatebooking",authmiddleware, rolemiddleware("admin","superadmin"), updateBookingStatus)
// router.get("/getmybookings",authmiddleware,rolemiddleware("company"), getmyBookings)

export default router



