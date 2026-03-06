import React, { useEffect, useState } from 'react'
import axios from "axios"
import { useNavigate, useParams } from 'react-router-dom';

 function OfficeDetail() {
  const navigate= useNavigate();
  const {officeid}= useParams();
 
  
  const[office, setOffice]= useState(null);

  useEffect(()=>{
       async function getoffice(){
    const res= await axios.get(`http://localhost:3000/officedetials/${officeid}`,  {withCredentials:true})
    setOffice(res.data)
    console.log(res.data);
    
   
       }
       
     
       getoffice()
  },[])
      




 return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">

      {/* Building Details */}
      <div className="bg-white shadow-md rounded-xl p-6">
        <h2 className="text-2xl font-semibold mb-4">Building Details</h2>

        <div className="space-y-2">
          <p>
            <span className="font-medium">Building Name:</span>{" "}
            {office?.buildingId?.buildingName}
          </p>

          <p>
            <span className="font-medium">Address:</span>{" "}
            {office?.buildingId?.address}
          </p>
        </div>
      </div>

      {/* Office Details */}
      <div className="bg-white shadow-md rounded-xl p-6">
        <h2 className="text-2xl font-semibold mb-4">Office Details</h2>

        <div className="grid grid-cols-2 gap-4">
          <p>
            <span className="font-medium">Office Number:</span>{" "}
            {office?.officeNumber}
          </p>

          <p>
            <span className="font-medium">Floor:</span>{" "}
            {office?.floor}
          </p>

          <p>
            <span className="font-medium">Capacity:</span>{" "}
            {office?.capacity}
          </p>

          <p>
            <span className="font-medium">Rent:</span>{" "}
            ₹{office?.officeRent}
          </p>

          <p>
            <span className="font-medium">Status:</span>{" "}
            {office?.availableStatus ? "Available" : "Occupied"}
          </p>
        </div>
        
      </div>
      <button onClick={()=>navigate(`/company/dashboard/${officeid}/bookoffice`)} className='bg-black text-white px-5 py-1 rounded-xl' >Book </button>

    </div>
  );
}

export default OfficeDetail
