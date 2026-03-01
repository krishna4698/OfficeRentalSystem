import axios from 'axios';
import  { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import {toast} from "react-toastify"
import { useAuth } from '../../context/AuthContext';







function Login() {
const navigate= useNavigate();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("");

   const{checkAuth, user}=  useAuth()

    async function loginRequest(){
      try{
const response =await axios.post("http://localhost:3000/auth/login", {
        email, password   
    },
    {
        withCredentials:true,
        headers:{
            "Content-Type": "application/json"
        }
    }
)
if(response.status==200){
   await checkAuth()
    // navigate("/company/dashboard")
} 
      }

      catch(e){
    toast.error(e.message);
      }
    

}
  useEffect(()=>{
    if(!user) return;
    if(user.role==="admin") navigate("/admin/dashboard")
      if(user.role==="company")  navigate("/company/dashboard");
  })


  return (
   <div className="flex min-h-screen items-center justify-center bg-black px-4 ">
  <div className="w-full max-w-sm rounded-2xl border border-white/20 bg-black p-8 shadow-[0_0_30px_rgba(255,255,255,0.05)] grid gap-4  ">
    
    <h1 className="mb-6 text-center text-2xl font-semibold text-white">
      Login
    </h1>

    <div className="space-y-4">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full rounded-lg border border-white/20 bg-transparent px-4 py-3 text-white placeholder-white/40 outline-none transition focus:border-white focus:ring-1 focus:ring-white"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full rounded-lg border border-white/20 bg-transparent px-4 py-3 text-white placeholder-white/40 outline-none transition focus:border-white focus:ring-1 focus:ring-white"
      />

      <button className="mt-4 w-full rounded-lg bg-white py-3 font-semibold text-black transition hover:bg-white/90 active:scale-[0.98]" onClick={loginRequest}>
        Login
      </button>
    </div>
    <div>
        <GoogleLogin
  onSuccess={async (credentialResponse) => {
    console.log("tis is ", credentialResponse)
    try {
      await axios.post(
        "http://localhost:3000/auth/google",
        {
          token: credentialResponse.credential,
        },
        { withCredentials: true }
      );

      // redirect user
      window.location.href = "/company/dashboard";
    } catch (err) {
      console.error(err);
    }
  }}
  onError={() => console.log("Login Failed")}
/>
    </div>
   
  </div>
     
</div>

  )
}

export default Login





