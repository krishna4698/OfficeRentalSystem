import Booking from "../../models/Booking.js";
import Company from "../../models/Company.js";
import Office from "../../models/Office.js";
import Building from  "../../models/Building.js"


export const addCompany= async (req,res)=>{
     
    const {companyName , address}=req.body;

    try{
        if(!companyName || !address){
            return res.json({message:"all fields are required"});
        }
        const company = await Company.create({
            companyName,
            address,
            role:req.user.id
        })
        res.json({message:"company added"})
    }
    catch(e){
        res.json(e);
    }
}

export const myCompany= async(req,res)=>{
        const user= req.user.id
        try{
             const company= await Company.find({role:user})
             res.json(company)
             
        }
        catch(e){
            res.json(e)
        }
}


// export const alloffices= async (req,res)=>{
//     const id = req.user.id;
//     console.log(id);
//    const offices= await Office.find().populate("buildingId")
//     res.json(offices)

// }
export const alloffices = async (req, res) => {
  try {
    const { minCapacity, maxPrice , limit} = req.query;
  const page= Number(req.query.page);
  const search= req.query.search;
  console.log("this is ",search)
    const skip= (page-1)* limit;
    const total= await Office.countDocuments();
  

   


    let filterorsearch = {
       availableStatus: "available"
    };

    if (minCapacity) {
      filterorsearch.capacity = { $gte: Number(minCapacity) };
    }

    if (maxPrice){
      filterorsearch.officeRent = { $lte: Number(maxPrice) };
    }

  //   if(search){
  //  filterorsearch.officeNumber= {$regex:search, $options:"i"}
  //   }

  if(search){
        //for.. if you search using the buildingName in the browse offices

    const building= await Building.find({address:{$regex:search, $options:"i"}});
    const buildingIds= building.map(b=>b._id);
    console.log( "tis is buildin",buildingIds)
  
      filterorsearch.buildingId= {$in:buildingIds}
  }



    
    const offices = await Office.find(filterorsearch).skip(skip).limit(limit)
      .populate("buildingId");
      // console.log(offices);
      
   
    res.status(200).json({
      data:offices,
      page,
      total,
      pages:Math.ceil(total/limit)

    });

  } catch (error) {
    console.error("Error fetching offices:", error);
    res.status(500).json({ message: "Server error" });
  }
};


export const getmyBookings= async (req,res)=>{
  const userid=req.user
  console.log("from getmybookings")
   console.log(userid)
       const bookings= await Booking.find({userId:userid.id}).populate({path:"officeid", populate:{path:"buildingId"}})
       if(!bookings){
        res.json({message:"no bookings exists for this user"})
       }
       console.log(bookings)

       res.json(bookings)
}

// export const  pagination =async (req,res)=>{
//   const userid= req.user
//   console.log(userid)
//   console.log("hello from pagination")
//           const page= req.query.page || 1;
//           const limit= req.query.limit || 5;
//           const skip= (page-1) * limit;
//           const total= await Office.countDocuments();

//           const offices= await Office.find().skip(skip).limit(limit);
//           res.json({
//             data:offices,
//             page,
//             total,
//             pages:Math.ceil(total/limit),
//           })
          
// }

export const officeDetail= async (req,res)=>{
  const id= req.params.officeid;
  console.log(" this is offcie id",id);
  
  const office= await  Office.findById(id).populate("buildingId")
  console.log(office)
  res.json(office)
}
