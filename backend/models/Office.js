import mongoose from "mongoose"

 const officeSchema=new mongoose.Schema({
        officeNumber:{type:String, required:true},
        floor:{type:String, required:true},
        capacity:{type:Number, required:true},
        officeRent:{type:Number,required:true},
        availableStatus:{
            type:String,
            enum:["available", "occupied"],
            default:"available"
        },
        buildingId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Building"
        }
})

export default mongoose.model("Office", officeSchema)