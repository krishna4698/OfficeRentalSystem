import React, { useState } from 'react'
import axios from "axios"
async function OfficeDetail() {
       const[office, setOffice]= useState();
       const res= await axios.post("http://localhost:3000")




  return (
    <div className=''>
       <div>
   <h1>Building Details</h1>
       </div>
       <div> 

        office details

       </div>
    </div>
  )
}

export default OfficeDetail
