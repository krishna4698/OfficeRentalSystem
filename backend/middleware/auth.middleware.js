// import cookieParser from "cookie-parser"
// import jwt from "jsonwebtoken"
// // import Company from "../models/Company";


// export const authmiddleware= (req,res, next)=>{
//     try{
//         // const headers= req.headers.authorization;
//         const cookietoken= req.cookies.token
//         console.log("this is cooking token",cookietoken);
 
//   if(!headers){
//     res.json("no headers/token provided")
//   }
//   const token= headers.split(" ")[1];
//   const decoded= jwt.verify(token, "secret");
 
//     // req.user={
//     //     role:decoded.role,
//     //     id:decode._id,
//     //     email:decoded.email
//     // }
//     req.user=decoded;
//     next();
//     }
//     catch(e){
//         res.json(e);
//     }
  
  

// }

import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

export const authmiddleware = (req, res, next) => {
  try {
    const cookieToken = req.cookies.token; 
    console.log("Cookie token:", cookieToken);

    if (!cookieToken) {
      return res.status(401).json({ message: "No cookie token found" });
    }

    const decoded = jwt.verify(cookieToken, "secret");

    req.user = decoded; // attach decoded user
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token", error });
  }
};

