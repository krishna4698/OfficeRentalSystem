import axios from 'axios'
import React from 'react'
import API from "../../api.js"
import { useNavigate } from 'react-router-dom'


import { toast } from 'react-toastify'

function Logout() {
    const navigate = useNavigate();
const logout= async(req,res)=>{

    
    try{
        const res= await axios.post(`${API}/auth/logout`,{}, {withCredentials:true})
        if(res){
                     navigate("/login")
           
        }

    }
    catch(e){
        toast.error("error")
    }
   
}

  return (
    <div>
       <button className='bg-black' onClick={logout}>Logout</button>
    </div>
  )
}

export default Logout
