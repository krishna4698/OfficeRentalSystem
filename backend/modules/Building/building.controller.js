import Building from "../../models/Building.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import Booking from "../../models/Booking.js";
import Office from "../../models/Office.js";


export const registerBuilding= async(req, res)=>{
    
    try{
         const { address, buildingName}= req.body;
    if(!buildingName || !address){
        res.json({message:"all fields are required"})
    }
    const building = await Building.create({
        buildingName,
        address,
        owner:req.user.id
    })
    res.json(building)

     }
     catch(e){
        res.json(e);
     }
}

export const getMyBuildings= async (req,res)=>{
      const id= req.user.id;

      const buildings= await Building.find({owner:id})
      const length= await Building.countDocuments();
      res.json(buildings, length)

}

export const  Bookings= async (req,res)=>{
    const user= req.user.id
    console.log(user)
    const buildings= await Building.find({owner:user})
    console.log(buildings);
    
    const buildingIds= buildings.map(b=>b._id)

    const offices= await Office.find({buildingId:{$in :buildingIds}})
    console.log(offices);
    
    const officeIds= offices.map(o=>o._id);
    
       const bookings = await Booking.find({officeid:{$in: officeIds}})
       res.json(bookings)
       console.log("hererererereeeeeeeee");
       
       console.log(bookings)
}   