import Building from "../../models/Building.js";
import Office from "../../models/Office.js"

export const createoffice= async (req,res)=>{
    const {officeNumber, floor , capacity, officeRent , buildingId}= req.body;
try{
    const create= await Office.create({
        officeNumber,
        floor,
        capacity,
        officeRent,
        buildingId
    })
       res.json(create)
       console.log(create);
       
}
catch(e){
    res.json(e);
}
    
}

export const getalloffices=async (req,res)=>{    //this is for if the owner is logged in he want to get all the offices created by him
       const id= req.user.id; 
       
    const building= await Building.find({owner:id})
    console.log("hello from teh offces modules")
    // console.log(building);
    
  const buildingIds= building.map(b=>b._id);




    const offices= await Office.find({buildingId:{ $in:buildingIds}}).populate("buildingId")
    console.log("this is offices of a particular admin", offices)
    res.json(offices)
}
