import Booking from "../../models/Booking.js";
import Company from "../../models/Company.js";
import Office from "../../models/Office.js";


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
    const skip= (page-1)* limit;
    const total= await Office.countDocuments();

    // 1️⃣ Create filter object
    let filter = {
      availableStatus: "available" // optional but recommended
    };

    // 2️⃣ Add capacity filter
    if (minCapacity) {
      filter.capacity = { $gte: Number(minCapacity) };
    }

    // 3️⃣ Add price filter
    if (maxPrice) {
      filter.officeRent = { $lte: Number(maxPrice) };
    }

    // 4️⃣ Use filter in query
    const offices = await Office.find(filter).skip(skip).limit(limit)
      .populate("buildingId");

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
       const bookings= await Booking.find({userId:userid.id})
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

