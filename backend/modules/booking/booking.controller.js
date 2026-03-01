import Booking from "../../models/Booking.js"
import Office from "../../models/Office.js"
import User from "../../models/User.js"
import Building from "../../models/Building.js"
 import transporter from "../../utils/sendMail.js"
 import 'dotenv/config'

export const createBookingRequest= async (req,res)=>{
     
try{
     const {officeid,userId, startdate, enddate, bookingAmount}= req.body;
     const user= await User.findById(userId);
      console.log("from bookin controlller tis is user:",user);

     console.log(req.body);
     
     const office= await Office.findById(officeid)  

     // imformation of the Building 

     const buildingid= await Building.findById(office.buildingId)
     // information of the owner of the offcie
      const ownerid= await User.findById(buildingid.owner)
      // const owner = await User.findById(ownerid);
      console.log("this is owner email",ownerid.email,)

     console.log("tis is buildin id",buildingid);
    //  console.log(office)
      // if(!office || office.status!=="available"){
      //   // res.json("office not available")
      //   console.log("office is not available", office?.status)
      // }
      console.log("hello")
      const createbooking= await Booking.create({
       userId,
        officeid,
        bookingAmount,
         startdate,
        enddate
      })
   
      console.log("hello 2")
      console.log(user.email)

    await transporter.sendMail({
      from:  `"OFFICE RENT" <${process.env.EMAIL}>`, 
      to: user.email,
       subject: "Booking Request Sent ✅",
        html: `
        <h2>Hi ${user.name},</h2>
        <p>Your booking request has been sent successfully.</p>
        <p><strong>Office:</strong> ${office.officeNumber}</p>
        <p><strong>Amount:</strong> ₹${office.officeRent}</p>
        <p><strong>Start Date:</strong> ${req.body.startdate}</p>
        <p><strong>Start Date:</strong> ${req.body.enddate}</p>
        <p>You will get another email once admin approves it.</p>`
       
      
    })
    // console.log("bookin is sent")
 const email = await transporter.sendMail({
      from: `"OFFICE RENT" <${process.env.EMAIL}>`,
      to: ownerid.email,
       subject: "New Booking Request 🔔",
       html: `
      <h2>Hi ${buildingid.buildingName},</h2>
      <p>You have a new booking request for your office.</p>
      <p><strong>Office:</strong> ${office.officeNumber}</p>
      <p><strong>Building:</strong> ${buildingid.buildingName}</p>
      <p><strong>Requested by:</strong> ${user.name} (${user.email})</p>
      <p><strong>Amount:</strong> ₹${office.officeRent}</p>
      <p><strong>Start Date:</strong> ${req.body.startdate}</p>  //pleased look into it later
      <p><strong>End Date:</strong> ${req.body.enddate}</p>
      <p>Login to your dashboard to approve or reject.</p>
      <br/>
      <p>Thanks, <br/> BuildOS Team</p>
    `
    })   
    console.log( "",email)
    
       res.json(createbooking)


 
   



}
catch(e){
    res.json(e)
}
     
}

export const updateBookingStatus = async (req,res)=>{

      try{
        const {bookingId, action}= req.body;
       if(!bookingId){
        return res.json("no such booking exist/provide booking id");
       }
    const booking= await Booking.findById(bookingId);
      console.log(booking);
     
        
      booking.status= action;
      await booking.save();
      if(booking.status=="approved"){
        
        const updateofficestatus = await Office.findByIdAndUpdate(booking.officeid, {
          availableStatus:"occupied"
        })
      }
      res.json({message:"booking confiremed and office status updated"})
      }
      catch(e){
        res.json(e);
      } 
     

}
  

// export const getmyBookings= async (req,res)=>{
//   const companyid=req.user.id;
//    console.log(companyid)
//        const bookings= await Booking.find({companyid})
//        if(!bookings){
//         res.json({message:"no bookings exists for this user"})
//        }
//        console.log(bookings)
//        res.json(bookings)
// }
