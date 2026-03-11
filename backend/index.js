import express from "express"
import cors from "cors"
import DB from "./config/db.js";
// import cookieParser from "cookie-parser";

import  registerRoute from "./routes/auth.route.js";
import officeroute from "./routes/office.route.js"
import companyroute from "./routes/compnay.route.js"
import bookingroute from "./routes/booking.route.js"
import superadminroute from "./routes/superadmin.route.js"
import buildingRoute from "./routes/building.route.js"
// import authmiddleware from "./middleware/auth.middleware.js";
import {authmiddleware} from "./middleware/auth.middleware.js";
import cookieParser from "cookie-parser";
const app= express();



app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

app.use(express.json());

app.use(cookieParser())

app.use("/", buildingRoute)
app.use("/", companyroute)
app.use("/auth", registerRoute)
app.use("/office", officeroute )
app.use("/booking", bookingroute)

app.use("superadmin", superadminroute)

app.use(authmiddleware)
app.get("/test",(req,res)=>{
    res.json("working right")
})

app.get("/protected", (req,res)=>{
    res.json("protected route")
})



DB().then(()=>{
    app.listen(3000,()=>{
    console.log("server is running on 3000 port")
})
})  