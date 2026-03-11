import Company from "../../models/Company.js";
import User from "../../models/User.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import {OAuth2Client} from "google-auth-library"
import "dotenv/config"









export const register= async (req,res)=>{
    const{ name, email, password, role, approvalStatus}= req.body;
    
    try{
          const user= await User.findOne({email})
    if(user){
        res.json({mesaage:"user is already registerd"})
    }

    if(!name || !password || !role || !email ){
        res.json({message:"all fields are required"})
    }
     const hashedpassword= await bcrypt.hash(password, 10)
    const newUser= await User.create({
        email,
        password:hashedpassword,
        role,
        name
        // ,
        // approvalStatus
    })
    res.json({mesaage:"User is registerd", newUser} )
    
    }


    catch(e){
        res.json(e);
    }
  
    

}

export const login= async(req,res)=>{

    const {email,password}= req.body;  
    try{
        const user = await User.findOne({email})
    if(!user) {
        res.status(404).json({mesaage:"invalid crededntials ya check email again"})
    }

    const isMatch= await bcrypt.compare(password, user.password)
    if(!isMatch){
        res.json({message:"invalid credentials"})
        
    }
    const token=  jwt.sign(
        {
            id:user._id,
            email:user.email,
            role:user.role,
            approvalStatus:user.approvalStatus,
        },
        "secret",
        {expiresIn:"7h"}
    )
    console.log(token);
    res.cookie("token", token, {
        httpOnly: true,
      secure: false,          // MUST be false on localhost
      sameSite: "lax",
      maxAge: 7 * 60 * 60 * 1000,
    })
    
    // res.status(200).json({message :"succesfully login your token is :" , token})
    res.status(200).send("lognend")
    }
    catch(e){
        res.json(e);
    }
    
}

export const me=  (req,res)=>{

    const user= req.user
    console.log("the user is :", user)
    res.json(user)

}


export const Logout= async (req,res)=>{
     res.clearCookie("token", {
        httpOnly: true,
        secure: false,
        sameSite:"lax"
     })
     res.json({message:"logout succesfully"})

}


// const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
// const  GOOGLE_CLIENT_ID="332907425455-lr7rnd2a4oi4fopd20nss1vdq51k0huc.apps.googleusercontent.com"
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleAuth = async (req, res) => {
  try {
    const { token } = req.body;
    // console.log("tis is token", token)
       
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience:process.env.GOOGLE_CLIENT_ID,
    });
    // console.log("tis is ticket", ticket)

    const payload = ticket.getPayload();
    console.log("tis is payload", payload)

    const { email, name, sub } = payload;

    // find or create user
    let user = await User.findOne({ email });
    // console.log("tis is user", user)

    if (!user) {
     user = await User.create({
  name,
  email,
  googleId: sub,
  authProvider: "google"
});
    }

    // issue your JWT
    const jwtToken = jwt.sign(
      { id: user._id , email:user.email, role:user.role, name:user.name},
      process.env.JWT_SECRET ||"secret" ,
      { expiresIn: "7d" }
    );

    res.cookie("token", jwtToken, {
      httpOnly: true,
      sameSite: "lax",
    });

    // res.json({ success: true });
    res.json(user)
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Google auth failed" });
  }
};



