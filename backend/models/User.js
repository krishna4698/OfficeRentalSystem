import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
     name:{type:String, required:true},
     password:{type:String, required:true},
     email:{type:String, required:true},
     role:{type:String, required:true,
        enum:["admin", "company"],
        default:"company"
     }
})

export default mongoose.model("User", userSchema)

// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },

//   email: {
//     type: String,
//     required: true,
//     unique: true,
//     lowercase: true,
//   },

//   password: {
//     type: String,
//     required: function () {
//       return this.authProvider === "local";
//     },
//     select: false,
//   },

//   role: {
//     type: String,
//     enum: ["admin", "company"],
//     default: "company",
//   },

//   // ⭐ NEW — for Google users
//   authProvider: {
//     type: String,
//     enum: ["local", "google"],
//     default: "local",
//   },

//   googleId: {
//     type: String,
//     index: true,
//   },

//   avatar: String,
// }, { timestamps: true });

// export default mongoose.model("User", userSchema);