import mongoose from "mongoose";
import "dotenv/config"

const DB = async () => {
  try {
    // await mongoose.connect("mongodb://localhost:27017/officeRent");
    await  mongoose.connect(process.env.DB_URL)
    console.log("Database connected");
  } catch (error) {
    console.error("Database connection failed:", error.message);
    
  }
};

export default DB;
