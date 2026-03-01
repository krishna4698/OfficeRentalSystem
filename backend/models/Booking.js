import mongoose from "mongoose"

const bookingSchema=  new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    officeid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Office",
        required:true,
        
    },
    startdate:{
        type:Date,
        required:true
    },
    enddate:{
        type:Date,
        required:true
    },
      bookingAmount:{
        type:Number,
        required:true
      },
      status:{
        type:String,
        enum:["pending", "approved", "rejected"],
        default :"pending"
      }
})

export default mongoose.model("Booking", bookingSchema)