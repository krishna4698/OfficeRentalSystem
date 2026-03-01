import mongoose from "mongoose"

const buildingSchema= new mongoose.Schema({
    buildingName:{type:String, required:true},
    address:{type:String, required:true},

    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }

})

export default mongoose.model("Building", buildingSchema)