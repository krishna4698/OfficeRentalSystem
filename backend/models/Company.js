import mongoose from "mongoose"

mongoose.connect("mongodb://localhost:27017/officeRentalSystem")

const companySchema= new mongoose.Schema({
    companyName:{type:String, required:true},
    address:{type:String, required:true},
    // email:{type:String, required:true},
    // password:{type:String, required:true},
    role:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }


})

export default mongoose.model("Company", companySchema)