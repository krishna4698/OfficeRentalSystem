import Company from "../../models/Company.js"


export const getallcompanies= async (req,res)=>{
    const companies= await Company.find().select("-password")
    res.json(companies)  
    
}